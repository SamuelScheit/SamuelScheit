# Embedding the libsignal rust library in a react-native app

Imagine you are working on a react-native mobile app, in which you want to implement messaging with end-to-end encryption.

You either have to implement your own protocol or you use an existing protocol.

But because you don't have the resources to implement your own protocol and you want to make it secure, you decide to use an existing protocol.

Luckily for you, you find the signal protocol, a well established and secure end-to-end encryption protocol with an open source implementation.

You just have to bind the library functions to your app and you are done.

Better said than done and you find yourself digging into a rabbit hole of a month long journey with many different approaches.

## Libsignal

Let's first get an overview of the libsignal library and the possible approaches to use it in a react-native app.

The [libsignal](https://github.com/signalapp/libsignal) library is written in rust and already embeds bindings for java, swift and nodejs, which replaces the deprecated [libsignal-protocol-javascript](https://github.com/signalapp/libsignal-protocol-javascript) library.

The `libsignal-protocol-javascript` could be easily integrated as it all written in javascript, but it isn't maintained anymore and doesn't support the latest version of the signal protocol.

Alternatively, the [libsignal-protocol-typescript](https://github.com/privacyresearchgroup/libsignal-protocol-typescript) can be used, which is a typescript port of the `libsignal-protocol-javascript` and seems to be more up to date.

The problem is that it relies on a third party (`privacyresearchgroup`) to maintain the library and implement new features securely. (e.g. Kyber quantum
resistant key exchange, which is missing in the library)

That means all that's left is using the rust `libsignal` library directly.

## Embedding libraries in react-native

There are many different approaches on how to embed and bind libraries in a react-native app.

1.  Link the c-abi library and create swift, java and javascript bindings

    The regular approach of linking libraries in react-native is to link the c-abi library and create swift (iOS) and java (Android) bindings.
    Those platform specific bindings can then be exposed to the javascript runtime using the react-native bridge.

    This is what exposing the encrypt function would look like using this approach:

    Android Java method:

    ```java
    @ReactMethod
    public String encrypt(String message) {
    	return nativeEncrypt(message);
    }
    ```

    Android Java JNI export:

    ```cpp
    extern "C"
    JNIEXPORT jstring JNICALL
    Java_com_libsignal_LibsignalModule_nativeEncrypt(JNIEnv *env, jclass type, jstring message) {
    	return signal_encrypt_message(messages);
    }
    ```

    iOS Swift implementation:

    ```swift
    @objc(Libsignal)
    class Libsignal: NSObject {
    	@objc(encrypt:message:)
    	func encrypt(message: String) -> String {
    		return signal_encrypt_message(message)
    	}
    }
    ```

    iOS Objective-C export:

    ```objc
    @interface RCT_EXPORT_MODULE(Libsignal, NSObject)

    RCT_EXTERN_METHOD(encrypt:(NSString *)message);
    ```

    This approach has the advantage that the already existing swift and java bindings of the libsignal library can be reused.
    The problem is that those pre exising bindings don't have the same api interface and a glue layer has to be created in swift and java to expose them to the javascript runtime.
    This glue layer would need to be implement all 302 functions of the libsignal library, in both swift and java and an additional javascript wrapper, which also need to be kept up to date with the latest version of the libsignal library.

    Not the best choice, let's look at the other options:

2.  Embed the node bindings of the rust library

    As the libsignal library already exposes bindings for nodejs, one could think that they can be used directly in a react-native app.
    The advantage of this approach is that there is no need to create and maintain bindings as all native and JS functions of the libsignal library can be reused.
    However, as the react-native app uses the hermes engine the node bindings can't be used directly, as it doesn't support the Node-API (NAPI).

    The hermes team is working on [integrating the Node-API into the hermes engine](https://github.com/facebook/hermes/discussions/1074#discussioncomment-8956229) but it's not finished yet.

    Luckily Microsoft has already partially created the Node-API for the hermes engine in their [hermes-windows](https://github.com/microsoft/hermes-windows) fork.
    The problem is that the hermes-windows fork is missing some features (like promises for threadsafe functions) of the Node-API, which are needed by the libsignal library and can't be used directly in a react-native JSI environment.

    Gladly, there is a third approach:

3.  Expose the functions directly from Rust with the JavaScript Interface (JSI) of the Hermes engine.

    JSI is a C++ API by the Hermes JS engine to link the runtime with native code. It allows JavaScript code to call native functions, access native objects, and register native modules.

    One benefit of this method is the ability to directly expose all functions from the rust library to the javascript runtime.

    But for this approach the C++ [JSI headers](https://github.com/facebook/hermes/blob/main/API/jsi/jsi/jsi.h) need to be bind to rust.
    At first [cxx](https://cxx.rs/) and [autocxx](https://google.github.io/autocxx/) seem to be promising tools to bind the C++ headers to rust.
    However after a lot of testing, it turns out that cxx and autocxx don't support some language features of the JSI headers, which are needed to expose the functions of the libsignal library.

    Gladly [Ibiyemi Abiodun](https://github.com/laptou) made a package called [jsi-rs](https://github.com/laptou/jsi-rs), which links the JSI headers to rust to be able to call the JSI api directly from rust.

---

There might have been also other approaches, like using react-native's turbomodules, or using RPC with a separate node process, or using step one and only writing a few bindings for the necessary use case.
But this approach of using jsi-rs seems to be a good alternative until the hermes engine supports the Node-API.

## Writing bindings with jsi-rs

After following the setup instructions for [jsi-rs](https://github.com/laptou/jsi-rs/) and cloning the example app, one notices that only android support is implemented.

To see how you can use jsi-rs for iOS have a look at this [PR](https://github.com/laptou/jsi-rs/pull/3/files) which adds an iOS example.

Additionally be aware that [`async` support](https://github.com/laptou/jsi-rs/issues/4) is not fully supported yet and you have to resort to awaiting the future with `futures::executor::block_on(result)?` and therefore blocking the thread.

Also there is no documentation available so here are some examples on how to use jsi-rs:

**Logging**

```rust

pub fn console_log(message: &str, rt: &mut RuntimeHandle) -> anyhow::Result<()> {
    let console = PropName::new("console", rt);
    let console = rt.global().get(console, rt);
    let console = jsi::JsiObject::from_value(&console, rt)
        .ok_or(JsiDeserializeError::custom("Expected an object"))?;

    let console_log = console.get(PropName::new("log", rt), rt);
    let console_log = jsi::JsiObject::from_value(&console_log, rt)
        .ok_or(JsiDeserializeError::custom("Expected an object"))?;
    let console_log = jsi::JsiFn::from_object(&console_log, rt)
        .ok_or(JsiDeserializeError::custom("Expected a function"))?;
    console_log.call([jsi::JsiString::new(message, rt).into_value(rt)], rt)?;

    Ok(())
}

console_log("Hello from Rust", &mut rt).ok();

```

**Exporting a HostObject**

```rust

let host_object = ModuleAPI;
let host_object = host_object.into_value(&mut rt);

rt.global().set(PropName::new("ModuleAPI", &mut rt), &host_object, &mut rt);


#[host_object()]
impl ModuleAPI {

}

```

**Exporting a function with parameters**

For some primitive types you can directly use the primitive parameter type.
Here are some examples on how to explicitly use the JSI api.

```rust

#[host_object()]
impl ModuleAPI {

	// assuming NodeJS buffers are available in the global scope
    #[host_object(method as buffer_to_string)]
    pub fn buffer_to_string<'rt>(&self, _rt: &mut RuntimeHandle<'rt>, buffer: JsiValue<'rt>) -> anyhow::Result<JsiValue<'rt>> {
		if !buffer.is_object() {
			return Err(anyhow!("Expected an Buffer"));
		}

		let buffer = JsiObject::from_value(&buffer, rt).ok_or(JsiDeserializeError::custom("Expected an Buffer"))?;
		let buffer = buffer.get(PropName::new("buffer", rt), rt);
		let buffer = JsiArrayBuffer::from_value(&buffer, rt).ok_or(JsiDeserializeError::custom("Expected an ArrayBuffer"))?;
		let buffer = buffer.data(rt).to_vec();

		let string = String::from_utf8(buffer).ok_or(JsiDeserializeError::custom("Expected a valid UTF-8 string"))?;

		Ok(JsiString::new(&string, rt).into_value(rt))
	}

	#[host_object(method as string_to_buffer)]
    pub fn string_to_buffer<'rt>(&self, _rt: &mut RuntimeHandle<'rt>, value: JsiValue<'rt>) -> anyhow::Result<JsiValue<'rt>> {
		if !value.is_string() {
			return Err(anyhow!("Expected a string"));
		}

		let value = JsiString::from_value(&value, rt)
			.ok_or(JsiDeserializeError::custom("Expected a string"))?;

		let mut output = String::new();
		let mut formatter = fmt::Formatter::new(&mut output);
		value.fmt(&mut formatter, rt)?;

		let bytes = output.as_bytes();

		let buffer_ctor = rt.global().get(PropName::new("Buffer", rt), rt);
		let buffer_ctor: JsiFn = buffer_ctor
			.try_into_js(rt)
			.ok_or(JsiSerializeError::custom("Buffer constructor not found"))?;
		let buffer = buffer_ctor
			.call_as_constructor(vec![JsiValue::new_number(bytes.len() as f64)], rt)
			.map_err(|e| JsiSerializeError::custom(format!("Buffer constructor failed: {:?}", e)))?;

		let buffer = JsiObject::from_value(&buffer, rt)
			.ok_or(JsiSerializeError::custom("Expected an object"))?;
		let array_buffer = buffer.get(PropName::new("buffer", rt), rt);

		let array_buffer: JsiArrayBuffer = array_buffer
			.try_into_js(rt)
			.ok_or(JsiSerializeError::custom("Expected an ArrayBuffer"))?;

		array_buffer.data(rt).copy_from_slice(bytes);

		Ok(buffer.into_value(rt))
	}

	#[host_object(method as bool_to_number)]
    pub fn bool_to_number<'rt>(&self, _rt: &mut RuntimeHandle<'rt>, bool: JsiValue<'rt>) -> anyhow::Result<JsiValue<'rt>> {
		if !value.is_bool() {
			return Err(anyhow!("Expected a boolean"));
		}

    	let bool = bool::from_value(&value, rt).ok_or(JsiDeserializeError::custom("Expected a boolean"))?

		Ok(JsiValue::new_number(bool as i64 as f64, rt).into_value(rt))
	}

}

```
