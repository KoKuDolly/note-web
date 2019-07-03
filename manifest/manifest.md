# manifest

## 概念

>Web应用程序清单是称为渐进式Web应用程序（PWA）的Web技术集合的一部分，这些Web技术是可以在没有应用程序商店的情况下安装到设备主屏幕上的网站。与普通的具有简单的主屏幕链接或书签的Web应用程序不同，PWA可以提前下载并可以脱机工作，也可以使用常规的Web API。
>
>Web应用程序清单在JSON文本文件中提供有关Web应用程序的信息，这些信息对于下载Web应用程序和向用户展示类似于本机应用程序（例如，安装在设备的主屏幕上，为用户提供更快的访问和更丰富的体验）是必需的。PWA清单包括其名称、作者、图标、版本、描述和所有必要资源的列表（以及其他内容）。

## Members

- background_color
  >background-colour成员为应用程序页定义了一个placeholeder背景色，以便在加载其样式表之前显示该颜色。当加载样式表之前清单可用时，用户代理将使用此值绘制快捷方式的背景色。因此，背景颜色应该与网站样式表中的背景颜色css属性匹配，以便在启动Web应用程序和加载网站内容之间实现平滑过渡。
  >
  >当主样式表从网络或存储媒体加载时，background颜色成员仅用于改善用户体验；当渐进式Web应用程序样式表可用时，用户代理不会将其用作background color css属性。
- categories
  >Categories成员是一个字符串数组，用于定义应用程序假定所属类别的名称。没有可能值的标准列表，但是W3C维护一个已知类别的列表。
  >
  >类别仅用作列出Web应用程序的目录或存储的提示，如搜索引擎和元关键字，目录和存储可以随意忽略它们。
  >
  >分类值在处理前由商店和目录进行小写，因此“news”和“news”被视为相同的值。首先鼓励开发人员使用小写。
  >
  >Example
  >
  >  ```json
  >    "categories": ["books", "education", "medical"]
  >  ```
  
- description
  >描述成员是一个字符串，开发人员可以在其中解释应用程序的功能。描述具有方向性，这意味着它可以根据dir和lang清单成员的值从左到右或从右到左显示。
- dir
  >显示清单中支持方向的成员的基本方向。与lang成员一起，它有助于正确显示从右向左的语言。
  >
  >dir成员可以设置为以下值之一：
  >
  >“auto”-文本方向由用户代理确定
  >
  >“LTR”-从左到右
  >
  >“RTL”-从右向左
  >
  >具有方向性的成员包括：`name`, `short_name`, `description`
  >
  >如果该值被省略或设置为自动，浏览器将使用Unicode双向算法对文本的方向进行最佳猜测。
- display
  >显示成员是一个字符串，用于确定开发人员对网站的首选显示模式。显示模式会更改向用户显示多少浏览器用户界面，并且可以从“浏览器”（当显示完整的浏览器窗口时）到“全屏”（当应用程序全屏时）。
  >您可以使用显示模式媒体功能，根据显示模式有选择地将CSS应用于应用程序。这可用于在从URL启动网站和从桌面图标启动网站之间提供一致的用户体验。
  >
  >If the display member is not specified, it defaults to "browser".
  >
  >  |显示模式|说明|回退显示模式
  >  |-|-|-|
  >  fullscreen|显示所有可用的显示区域，不显示用户代理chrome。|standalone
  >  standalone|应用程序看起来和感觉就像一个独立的应用程序。这可以包括具有不同窗口的应用程序、应用程序启动程序中自己的图标等。在此模式下，用户代理将排除用于控制导航的UI元素，但可以包括其他UI元素，如状态栏。|minimal-ui
  >  minimal-ui|应用程序看起来和感觉都像一个独立的应用程序，但是有一组用于控制导航的最小的用户界面元素。这些元素因浏览器而异。|browser
  >  browser|应用程序在传统浏览器选项卡或新窗口中打开，具体取决于浏览器和平台。这是默认设置。|(None)
- iarc_rating_id
  >`iarc_rating_id`成员是一个字符串，代表Web应用程序的国际年龄评定联盟（IARC）认证代码。它用于确定Web应用程序适合的年龄。
  >
  >只要分布式产品保持不变（即，在不同的店面上不提供完全不同的代码路径），相同的代码可以在多个参与店面之间共享。
- icons
  >icons成员指定一个对象数组，这些对象表示可以作为不同上下文的应用程序图标的图像文件。例如，它们可用于在其他应用程序列表中表示Web应用程序，或将Web应用程序与操作系统的任务切换器和/或系统首选项集成。
  >
  >Image objects may contain the following values:

  Member|Description
  -|-|
  sizes|调整包含空格分隔图像尺寸的字符串的。
  src|图像文件的路径。如果SRC是相对URL，则基本URL将是清单的URL。
  type|键入有关图像媒体类型的提示。此成员的目的是允许用户代理快速忽略不支持媒体类型的图像。
  purpose|定义映像的用途，例如，如果映像是为了在主机操作系统的上下文中提供某种特殊用途（即为了更好地集成）。用途可以具有以下值之一：
      | badge：当空间限制和/或颜色要求与应用程序图标的要求不同时，用户代理可以显示此图标。
      | maskable：图像设计时考虑了图标屏蔽和安全区域，这样，安全区域之外的图像的任何部分都可以被用户代理安全地忽略和屏蔽。
      | any：用户代理可以在任何上下文中自由显示图标（这是默认值）。
- lang
  >lang成员是包含单个语言标记的字符串。它为清单中支持方向性的成员的值指定主要语言，并与dir一起确定它们的方向性。
- name
  >名称成员是一个字符串，它表示通常显示给用户的Web应用程序的名称（例如，在其他应用程序列表中，或作为图标的标签）。名称具有方向性，这意味着它可以根据dir和lang清单成员的值从左到右或从右到左显示。
- orientation
  >方向成员为网站的所有顶级浏览上下文定义默认方向。
  >在各种显示模式下，用户代理可能不支持方向和/或其特定值，因为对它们的支持对于特定的上下文没有意义。
  >运行时可以通过屏幕方向API更改方向。
  >orientation can take one of the following values: `any`, `natural`, `landscape`, `landscape-primary`, `landscape-secondary`, `portrait`, `portrait-primary`, `portrait-secondary`
- prefer_related_applications
  >prefer_-related_-applications成员是一个布尔值，指定相关_-applications中列出的应用程序应优先于Web应用程序。如果prefer_-related_-applications成员设置为true，则用户代理可能建议安装一个相关的应用程序，而不是此Web应用程序。
  >
  >如果是ommited，则首选与_相关的_应用程序默认为false。
- related_applications
  >是一个对象数组，指定可以通过底层平台安装或访问的本机应用程序，例如，可以通过Google Play Store获得的本机Android应用程序。此类应用程序旨在作为清单网站的替代方案，提供类似/等效功能，如本地应用程序等效功能。
  >
  >开发者可以通过将prefer_-related_applications设置为true来指定本机应用程序优于Web应用程序。
  >
   ```json
      "related_applications": [
        {
          "platform": "play",
          "url": "https://play.google.com/store/apps/details?id=com.example.app1",
          "id": "com.example.app1"
          }, {
          "platform": "itunes",
          "url": "https://itunes.apple.com/app/example-app1/id123456789"
        }
      ]
   ```

- scope
  >作用域成员是定义此Web应用程序应用程序上下文的导航作用域的字符串。它限制应用清单时可以查看哪些网页。如果用户在作用域之外导航，它将恢复到浏览器选项卡或窗口内的正常网页。
  >如果作用域是相对URL，则基URL将是清单的URL。
  >
  >**Examples**
  >
  >如果作用域是相对的，则清单URL用作基URL:
  >
  > ```json
  >   "scope": "/app/"
  > ```
  >
  >以下范围限制了当前网站的导航：
  >
  > ```json
  >   "scope": "https://example.com/*/"
  > ```
  >
  >最后，下面的示例将导航限制为当前站点的子目录：
  >
  > ```json
  >   "scope": "https://example.com/subdirectory/*"
  > ```

- screenshots
  >Screenshots成员定义了一组用于显示应用程序的屏幕截图。这些图片用于渐进式Web应用商店。
  >
  >Examples

  ```json
      "screenshots" : [
        {
          "src": "screenshot1.webp",
          "sizes": "1280x720",
          "type": "image/webp"
        },
        {
          "src": "screenshot2.webp",
          "sizes": "1280x720",
          "type": "image/webp"
        }
      ]
  ```

- serviceworker
  >ServiceWorker成员描述了一个服务工作者，开发人员打算安装它来控制PWA。
  >
  >Examples

  ```json
    "serviceworker": {
      "src": "./serviceworker.js",
      "scope": "/app",
      "type": "",
      "update_via_cache": "none"
    }
  ```

  >Values
  >
  >Service worker contain the following values (only src is required):
  >
  >   Member | Description
  >    - | -
  >    src | 从中下载服务工作者脚本的URL。这是ServiceWorker成员中唯一需要的成员。
  >    scope | 表示一个URL的字符串，它定义了服务工作者的注册作用域；也就是说，服务工作者可以控制的URL范围。这通常是相对于应用程序的基URL的相对URL。默认情况下，服务工作者注册的作用域值设置为服务工作者脚本所在的目录。
  >    type | ？
  >    update_via_cache | 获取服务工作线程时是否应绕过用户代理缓存。
- short_name
  >short_name是一个字符串，表示如果没有足够的空间显示名称（例如，作为电话主屏幕上图标的标签），则向用户显示的Web应用程序的名称。短名称具有方向性，这意味着它可以根据dir和lang清单成员的值从左到右或从右到左显示。
- start_url
  >start_url是一个字符串，它表示Web应用程序的起始URL—用户启动Web应用程序时应加载的首选URL（例如，当用户从设备的应用程序菜单或主屏幕点击Web应用程序的图标时）。
  >
  >start-url成员纯粹是建议性的，用户代理可以忽略它，或者允许用户在安装时或之后更改它。
- theme_color
  >theme_color是一个字符串，用于定义应用程序的默认主题颜色。这有时会影响操作系统显示站点的方式（例如，在Android的任务切换器上，主题颜色围绕着站点）。

## Example manifest

```json
{
  "name": "HackerWeb",
  "short_name": "HackerWeb",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "A simply readable Hacker News app.",
  "icons": [{
    "src": "images/touch/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen72.png",
    "sizes": "72x72",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen96.png",
    "sizes": "96x96",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen168.png",
    "sizes": "168x168",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen192.png",
    "sizes": "192x192",
    "type": "image/png"
  }],
  "related_applications": [{
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
  }]
}
```

## Deploying a manifest

Web应用程序清单使用文档的`<head>`中的`<link>`元素部署在HTML页面中：

```html
  <link rel="manifest" href="/manifest.webmanifest">
```

.webmanifest扩展名在规范的媒体类型注册部分中指定（清单文件的响应应返回内容类型：application/manifest+json）。浏览器通常支持带有其他适当扩展名的清单，如.json（内容类型：application/json）。

如果清单需要凭据来获取-即使清单文件在当前页的同一组织中，交叉源属性也必须设置为“使用凭据”。

## Splash screens

## Mime type

清单应使用application/manifest+json mime类型提供。但是，这样做是可选的。
