# Sample application

Our sample app will display a “Chat with us!” button on an iOS device. Once clicked, a chat with your support team will be opened in the app.

Feel free to download the [source code of this application](https://github.com/livechat/chat-window-ios/archive/master.zip) (an Xcode project).

<img src="https://developers.livechatinc.com/wp-content/uploads/2013/11/sample-app1.jpg" class="inline" title="In-app widget example for iOS" alt="In-app widget example for iOS" width="200"/>
<img src="https://developers.livechatinc.com/wp-content/uploads/2013/11/sample-app2.jpg" class="inline" title="In-app widget example for iOS" alt="In-app widget example for iOS" width="200"/>

Possible use-cases include: adding a chat button to your “Contact us” screen or displaying a chat button all the time, within the app. Read more about [providing in-app support](https://www.livechatinc.com/blog/2013/10/new-approach-to-in-app-support/) in mobile applications.

Let’s get started!

## Chat view

Create a new project with ‘Empty Application’ template. Add a new class that will display the chat window.

```swift
// LCChatViewController.h
#import <UIKit/UIKit.h>

@interface LCCChatViewController : UIViewController<UIWebViewDelegate>

@property (strong, nonatomic) UIWebView *chatView;
@property (strong, nonatomic) UIActivityIndicatorView *indicator; 
- (id)initWithChatUrl:(NSString*)url;

@end
```
<div class="clear"></div>

`LCCChatViewController` derives from `UIViewController`. It has two controls: `chatView` that will display chat window, and `indicator` which is a loader animation displayed until the chat window is loaded.

Also the `initWithChatUrl`: initialiser is defined to pass the chat window URL. The class implements `UIWebViewDelegate` protocol.


```swift
// LCChatViewController.m
#import "LCCChatViewController.h"

@interface LCCChatViewController ()

@property (nonatomic, copy) NSString *chatUrl; 

@end

@implementation LCCChatViewController

- (id)initWithChatUrl:(NSString *)url
{
    self = [super init];
    if (self) {
        [self setChatUrl:url];
    }
    return self;
}
```
<div class="clear"></div>

`LCCChatViewController` defines private property `chatUrl` that is set in `initWithChatUrl`:

```swift
- (void)viewDidLoad
{
    [super viewDidLoad];

    [self.view setBackgroundColor:[UIColor whiteColor]];
    [self setTitle:@"Chat"];

    CGSize screenSize = [[UIScreen mainScreen] bounds].size;

    self.chatView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, screenSize.width, screenSize.height)];
    [self.chatView setDelegate:self];
    [self.chatView setAlpha:0.0];
￼￼    [self.view addSubview:self.chatView];

    self.indicator = [[UIActivityIndicatorView alloc] initWithFrame:CGRectMake(0, 0, screenSize.width, screenSize.height)];
    [self.indicator setColor:[UIColor blackColor]];
    [self.indicator startAnimating];
    [self.view addSubview:self.indicator];

    NSURL *url = [NSURL URLWithString:self.chatUrl];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];
    [self.chatView loadRequest:request];
}
```

<div class="clear"></div>

In the `viewDidLoad` method, `chatView` and `indicator` are set up and added as subviews. `setAlpha`: message hides `chatView` until it is loaded. Then the `loadRequest`: message starts loading the chat window.

```swift
- (void)webViewDidFinishLoad:(UIWebView *)webView 
{
    void (^showChatView)(void) = ^(void) { 
        [self.chatView setAlpha:1.0]; 
        [self.indicator setAlpha:0.0]; 
    }; 

    void (^stopIndicator)(BOOL) = ^(BOOL finished) { 
        [self.indicator stopAnimating]; 
    }; 

    [UIView animateWithDuration:1.0 
                          delay:1.0 
                        options:UIViewAnimationOptionCurveEaseInOut 
                     animations:showChatView 
                     completion:stopIndicator];
} 
@end
```
<div class="clear"></div>

`webViewDidFinishLoad:webView` is called when chat window is loaded. Then an animation is played to hide the `indicator` and display the `chatView`. The animation starts with 1 second delay, to give the `chatView` a little more time to render chat window properly.

## Chat URL request

As the chat view controller is ready, add a new class that will obtain required chat URL address.

```swift
// LCCHomeViewController.h 
#import <UIKit/UIKit.h>
#import "LCCChatViewController.h"

@interface LCCHomeViewController : UIViewController 

@property(nonatomic, strong) LCCChatViewController *chatViewController; 

@end
```

<div class="clear"></div>

`LCCHomeViewController` derives from `UIViewController` and has `chatViewController` property to display the chat window (deﬁned in `LCCChatViewController.h`).

```swift
// LCCHomeViewController.m 
#import "LCCHomeViewController.h" 
#import <MapKit/MKMapView.h>

#define LC_URL        "https://cdn.livechatinc.com/app/mobile/urls.json"
#define LC_LICENSE    "3498581"
#define LC_CHAT_GROUP "0"

@interface LCCHomeViewController () 
@property (nonatomic, strong) NSString *chatURL; 

- (void) requestUrls; 
- (NSString*) prepareUrl:(NSString *)url; 
- (void) startChat:(UIButton*)button; 

@end
```

<div class="clear"></div>

`MKMapView.h` is imported from MapKit framework to create sample map view. MapKit framework should be added to the project.

Constant `LC_URL` contains the address where the chat and status URLs can be obtained from. `LC_LICENCE` and `LC_CHAT_GROUP` symbols will replace templates in chat and status URLs. 

Please replace value of `LC_LICENCE` with your `licence id`. You will find your ​[**license ID**](https://my.livechatinc.com/settings/code) in the LiveChat tracking code snippet.

`LCCHomeViewController` defines `chatURL` private property that stores the address of the chat window and three private methods.

```swift
@implementation LCCHomeViewController 

- (void)viewDidLoad 
{ 
    [super viewDidLoad]; 

    CGSize screenSize = [[UIScreen mainScreen] bounds].size;
    MKMapView *mapView = [[MKMapView alloc] initWithFrame:CGRectMake(0, 0, screenSize.width, screenSize.height)];
    [self.view addSubview:mapView];

    UIBarButtonItem *chatButton = [[UIBarButtonItem alloc] 
                                    initWithTitle:@"Chat with us!" 
                                    style:UIBarButtonItemStyleBordered 
                                    target:self 
                                    action:@selector(startChat:)];
    [self.navigationItem setRightBarButtonItem:chatButton]; 

    [self requestUrl]; 
}
```

<div class="clear"></div>

In the `viewDidLoad` method, `mapView` is added to the view and `chatButton` is set up. When the button is tapped, it will start the chat by calling the `startChat`: method. When the button is ready, `requestUrl` method is called.

```swift
- (void)requestUrl
{
    NSURLSession *session = [NSURLSession sharedSession];
    NSURL *url = [NSURL URLWithString:@LC_URL];
    [[session dataTaskWithURL:url
            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                if (!error) {
                    NSError *jsonError;
                    NSDictionary *JSON = [NSJSONSerialization JSONObjectWithData:data
                                                                         options:NSJSONReadingAllowFragments
                                                                           error:&jsonError];

                    if ([JSON isKindOfClass:[NSDictionary class]] && [JSON valueForKey:@"chat_url"] != nil) {
                        self.chatURL = [self prepareUrl:JSON[@"chat_url"]];
                    } else if (jsonError) {
                        NSLog(@"%@", jsonError);
                    }
                } else {
                    NSLog(@"%@", error);
                }
            }] resume];
}
```

<div class="clear"></div>

Method `requestUrls` performs a request to `LC_URL` and defines two blocks: `successHandler` and `failureHandler`. `successHandler` extracts `chatURL` from `JSON` response using the `prepareUrl`: method.

```swift
- (NSString *)prepareUrl:(NSString *)url 
{ 
    NSMutableString *string = [NSMutableString stringWithFormat:@"https://%@", url]; 

    [string replaceOccurrencesOfString:@"{%license%}" 
                            withString:@LC_LICENSE 
                              options:NSLiteralSearch 
                                range:NSMakeRange(0, [string length])]; 

    [string replaceOccurrencesOfString:@"{%group%}" 
                            withString:@LC_CHAT_GROUP 
                              options:NSLiteralSearch 
                                range:NSMakeRange(0, [string length])]; 

    return string; 
}
```

<div class="clear"></div>

Method `prepareUrl:` adds http:// at the begging of the ULR and replaces {%license%} and {%group%} templates with `LC_LICENCE` and `LC_CHAT_GROUP`.

```swift
- (void)startChat:(UIButton*)button { 

    if (!self.chatViewController) { 
        self.chatViewController = [[LCCChatViewController alloc] initWithChatUrl:self.chatURL]; 
        [self setShouldPerformRequest:NO]; 
    } 

    [self.navigationController pushViewController:self.chatViewController animated:YES]; 
} 
@end
```

<div class="clear"></div>

When `chatButton` is tapped, the chat view is pushed to the screen. If it is happening for the first time, `chatViewController` is created.

## AppDelegate

Class `LCCAppDelegate` is generated automatically with a new project.

```swift
// LCCAppDelegate.m 
#import "LCCAppDelegate.h" 
#import "LCCHomeViewController.h" 

@implementation LCCAppDelegate 

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary 
*)launchOptions 
{ 
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]]; 

    LCCHomeViewController *viewController = [[LCCHomeViewController alloc] init]; 
    UINavigationController *navController = [[UINavigationController alloc] 
                                                    initWithRootViewController:viewController]; 
    [self.window setRootViewController:navController]; 

    self.window.backgroundColor = [UIColor whiteColor]; 
    [self.window makeKeyAndVisible]; 
    return YES; 
}
```

In `application:didFinishLaunchingWithOptions`, create an instance of UINavigationController initialized with `viewController` (`LCCHomeViewController` instance) and set it as window’s main view controller.