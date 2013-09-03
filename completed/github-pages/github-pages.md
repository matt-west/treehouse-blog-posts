# Hosting Your Website Using GitHub Pages

So you want to launch a simple website but don't want to have to go through the dull process of having to setup another hosting package. There is an easier solution. If you're just launching a few simple pages you can use GitHub to host your static websites for free.

In this blog post you are going to learn how to host your website for free using GitHub pages.

Lets get started.

***
**Note**: This post assumes that you have a [GitHub](https://github.com) account and some basic knowledge of the version control system [Git](http://git-scm.com/).
***

## Create Your GitHub Repository

The files that make up your website will need to be stored within a GitHub repository. If you're creating a website to promote one of your existing GitHub projects you can add the website files to a new branch, otherwise you can just setup a new repo for your site.

***
Note: If you are not adding your website files to an existing repo make sure that you [setup a new repo](https://help.github.com/articles/create-a-repo) before continuing.
***

Now open up terminal (command prompt on Windows) and make sure that you have a copy of your GitHub repo on your computer. Once you got your local copy, move into the project folder using the `cd` command.

<pre>
// Retrieve a copy of your GitHub repo.  
git clone https://github.com/**user**/**repository**.git
// Move into that directory.
cd repository  
</pre>

***
**Note**: Make sure that you change the clone URL to the URL of your GitHub repo. This can be found on the main project page.
***

## Create an Orphan Branch

Now you need to create a new [orphan branch](http://www.git-tower.com/files/applicationHelp/pgs/Refs_Branches_DetachedOrphaned.html) within your repo that will hold all of your website files.

This new branch should be called `gh-pages`.

<pre>
git checkout --orphan gh-pages
</pre>

If you already had files in the master branch of your GitHub repo you now need to delete these from the new `gh-pages` branch. To do this you can use the following command:

<pre>
git rm -rf .
</pre>

## Add Your Website Files

Now that your repo has been properly setup it's time to add all of the HTML, CSS and JavaScript files that make up your website. Once you have added these to your repo you need to commit the changes. To do this you can use the following command.

<pre>
git commit -a -m "Adding pages"
</pre>

***
**Note**: The `-a` flag is shorthand for `git add .`
***

## Push Your Changes to GitHub

Okay so you've got all your files where they need to be. The only thing left to do now is to push the new `gh-pages` branch up to GitHub. You do this using the `git push` command.

<pre>
git push origin gh-pages
</pre>

That's it! Your website should now be available at http://**username**.github.io/**repository**/.

## Using a Custom Domain

The last thing I want to cover in this post is how you can use your own domain name with your new GitHub-hosted website.

First you will need to create a new file in your GitHub repo called `CNAME` that contains the domain name (or subdomain) that you wish to use. This file should be placed in the `gh-pages` branch if you are using *project-pages* (as we have been in this post). If you are using *user-pages* the file should be placed in the `master` branch.

Your `CNAME` file might look like the following:

<pre>
teamtreehouse.com
</pre>

Next you will need to update the DNS records for your domain name. This is usually done through a control panel provided by your domain registrar.

If you want to use a root domain (such as `teamtreehouse.com`) for your website you will need to setup a new **A record** that points to the IP address `204.232.175.78`.

If you are using a subdomain (such as `blog.teamtreehouse.com`) it's best to create a new **CNAME record** that points to your GitHub user subdomain (`**username**.github.io`). This is so that the DNS will be automatically adjusted if the servers IP address changes on GitHub.

***
**Note**: For information about the difference between CNAME and A records check out [this video](http://www.youtube.com/watch?v=WqhgGpv4cKY).
***

It may take a little while for your DNS changes to take effect. This is usually no more than a few hours. Once the changes have gone through, you should be able to access your new website from your custom domain name.

## Final Thoughts

In this post I've showed you how to host pages that you've created yourself but it's worth noting that GitHub also has a tool for [automatically generating pages](http://pages.github.com/) for your projects. You can launch this tool from the project settings page.

GitHub pages does limit you to using static assets (HTML, CSS and JS) for your websites, but you could use something like [Jekyll](http://jekyllrb.com/) to make it easier to generate these files.

It's not going to meet everyone's needs but if you just want to launch a simple website, GitHub pages is a free and easy way to get up and running.
