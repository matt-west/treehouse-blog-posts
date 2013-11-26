You will have probably noticed that Google added a new addition to their search results a little while back. Verified content creators can now have a headshot and byline displayed alongside their links in the search results.

In this blog post you’re going to learn how to set up Google Authorship so that you too can start appearing in search results.

## Why is Google Authorship Important?

!!! Image of Example Search Result

Google Authorship is important for a number of reasons. The simplest being that it helps to make your content stand-out amongst the other links in the search results. Displaying the authors picture helps to create an emotional connection with the searcher, increasing the likelihood that your links will be clicked on.

Google Authorship works by creating a link between your content and your Google+ profile. The image that is displayed in the search results is taken from your Google+ profile picture. If the searcher clicks on your picture in the search results they are taken to your Google+ profile. Your name and current Google+ follower count is also displayed alongside the search result. This all helps to build credibility with the searcher and increases the visibility of your personal profile.

## Linking Your Content to Your Google+ Profile

There are two different ways to set up Google Authorship for your content. Authorship is assigned on a per-page basis. If you have a blog with multiple authors (such as the Treehouse Blog) you can therefore connect the Google+ profiles of each of the authors to their own content.

### Option One: Verified Email

Your first option is to use an email address to verify that you are a contributor to a site. Google will then look for a byline on the page to make the link to your Google+ profile. 

For this to work your email address will need to be on the same domain as your content (e.g. “matt@mattwest.io”). If you can't meet this requirement you will need to use option two.

To get set up using the verified email strategy follow these steps:

1. Make sure that you have a Google+ profile with a recognisable headshot set as your profile photo.
2. Ensure that the page you wish to claim ownership of contains a byline with your name as it appears on your Google+ profile (e.g. “By Matt West”).
3. You now need to add your email address and website domain to your Google+ profile. Google has a little tool that will do this for you. Visit <https://plus.google.com/authorship> and submit your email address.

Your content will now be linked to your Google+ profile. Remember to repeat this process for any other sites that you contribute to.

### Option Two: Links

If you don't have an email address on the same domain as your content, you can set up Google Authorship by adding a special link to your page. This method will require some minor changes to your HTML.

To use this method add a link to your Google+ profile somewhere on the page. The byline is usually a good location, but it can appear anywhere.

`<a href=“http://plus.google.com/103780700566333678292?rel=author”>Matt West</a>`

The key here is to add the `?rel=author` parameter to the end of your Google+ profile URL.

***
**Note**: If you use WordPress, there is a [plugin available](http://wordpress.org/plugins/google-author-link/) for managing this process. Once installed, all you need to do is add your Google+ URL to your user profile.
***

Once you've placed the link on your pages you need to add the site domain to the **Contributor to** list on your Google+ profile. This can be accessed by editing the **Links** section. You don't need to add the individual URLs for each piece of content, the main domain will do just fine.

### Testing Authorship

!!! Image of testing tool.

It might take a little while before your headshot starts appearing in search results. To test that you have set up authorship correctly you can use Google’s [Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets).

Enter the URL for one of your pages and click **Preview**. If authorship is set up correctly you should see your headshot and byline in the result preview.

If you used the verified email method, the **Authorship Email Verification** tool will confirm that your Google+ profile has been linked to the domain. 

## A Note For Publishers

Publishers can connect a website to their Google+ brand page by adding a link to their site’s home page. This time the URL parameters should be set to `?rel=publisher`.

`<a href="https://plus.google.com/+gotreehouse?rel=publisher">Treehouse</a>`

Next you need to make sure that the **Website** field on your Google+ brand page is set to your website’s home page. You can use the [Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets) to check that everything is set up correctly.

Connecting your website to your brand page will make your site eligible for [Google+ Direct Connect](https://support.google.com/plus/answer/1711199?hl=en).

## Final Thoughts

Google Authorship is so simple to set up that there’s really no reason why webmasters shouldn’t be taking advantage this. The visibility boost in search results can drive more traffic to your site, and help to raise the profile of both authors and publishers.

I’m interested to see how other search engines will adopt similar authorship features. Relying on Google+ profiles to verify content creators keeps the current implementation firmly within Google’s walled garden. Perhaps we will see the introduction of a standardized verification strategy that would allow other search engines to implement similar features.

## Useful Links

* [Link your Google+ profile to the content that you create](https://plus.google.com/authorship)
* [Google: Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets)
* [Google: Author information in search results](https://support.google.com/webmasters/answer/1408986)
