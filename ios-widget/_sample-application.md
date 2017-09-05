## Requirements

- iOS 9.0+
- Xcode 8.0+

## Installation

You integrate LiveChat into your project manually or with a dependency manager.

### CocoaPods

[CocoaPods](http://cocoapods.org) is a dependency manager for Cocoa projects.

Install it with the following command:

```bash
$ gem install cocoapods
```
<div class="clear"></div>

To integrate LiveChat into your Xcode project using CocoaPods, specify it in your `Podfile`:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
platform :ios, '9.0'
use_frameworks!

target '<Your Target Name>' do
    pod 'LiveChat', '~> 2.0'
end
```
<div class="clear"></div>

Then, run the following command:

```bash
$ pod install
```

### Manual Installation

You can integrate LiveChat into your project manually without using a dependency manager. 

#### Swift

Just drag all files from the `LiveChat/Classes` directory into your project.

#### Objective-C

Drag all files from the `LiveChat/Classes` directory into your project. When adding thefirst `*.swift` file to Objective-C project, Xcode will ask you to create a Bridging Header. It is not necessary for LiveChat to work, so you can decline unless you plan to call Swift code from Objective-C. More information about bridging headers and Swift and Objective-C interoperability can be found [here](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html). You need to put the following import statement: `#import "<Your Project Name>-Swift.h"` at the top of your .m file.

Also, for Objective-C projects, you need to set the **Embedded Content Contains Swift Code** flag in your project to `Yes` (found under **Build Options** in the **Build Settings** tab). 

## Usage

### Initalization

```swift
import LiveChat

LiveChat.licenseId = "YOUR_LICENSE_ID"
```

### Presenting Chat Widget

```swift
LiveChat.presentChat()
```

### Setting Custom Variables

You can provide customer name or email if they are known, so a customer will not need to fill out the pre-chat survey:

```swift
LiveChat.name = "iOS Widget Example"
LiveChat.email = "example@livechatinc.com"
```
<div class="clear"></div>

If you want to associate some additional info with your customer, you can set up Custom Variables:

```swift
LiveChat.setVariable(withKey:"Variable name", value:"Some value")
```

### Assign chat to specific group

You can route your customers to specific group of agents by providing groupId. More information can be found here: https://www.livechatinc.com/kb/dividing-live-chat-by-group/.

```swift
LiveChat.groupId = "7"
```

### Notifying the user about the agent's response

```swift
class YOUR_CLASS_NAME : LiveChatDelegate { // Your class need to implement LiveChatDelegate protocol
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        LiveChat.licenseId = "YOUR_LICENSE_ID"
        LiveChat.delegate = self // Set self as delegate

        return true
    }

    func received(message: LiveChatMessage) {
        print("Received message: \(message.text)")
        // Handle message here
    }
}
```

You can notifiy your user about the agent's response if the chat has been minimized by the user. To handle the incoming messages, your class must implement the `LiveChatDelegate` protocol and set itself as `LiveChat.delegate`.

### Handling URL

```swift
func handle(URL: URL) {
    print("URL is \(URL.absoluteString)")
    // Handle URL here
}
```

By default, all links in the chat messages are opened in Safari browser. To change this behavior you can use `LiveChatDelegate` to handle the URLs yourself.

### Sending Photos from the device library

If you have file sharing enabled for the visitors, you should provide the usage description by including the `NSPhotoLibraryUsageDescription` (`Privacy - Photo Library Usage Description`) key in your `Info.plist` file to avoid crash on iOS 10 or higher.

## Sample Apps

Sample apps for both Swift and Objective-C can be found in the `Examples` folder.

## Getting help

If you have any questions or want to provide feedback, [chat with us!](https://secure-lc.livechatinc.com/licence/8413431/open_chat.cgi)

## License

LiveChat for iOS is available under the MIT license. See the LICENSE file for more info.
