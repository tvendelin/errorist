# Multilingual Errorist

Errorist is a website theme designed originally with foreign language students in mind. Specifically, to support a workflow where students manage their grammar exercises under Git and GitHub, and post their exercises in a blog, highlighting the errors they made – hence the name.

That being said, you can build a ‘normal’ multilingual, multi-authored responsive website with Errorist. For that part, you will enjoy efficient and robust multilingual content management with minimal editing efforts. Thanks to the way the content is structured with Errorist, your Markdown files will also contain less code noise than usual.

Finally, Errorist is a text-only theme – it doesn’t include a single image of its own. That puts your content – articles, photos, videos, graphs – into the spotlite.


## Install

Recursively clone the bootstrapping project:

```
git clone --recurse-submodules git@github.com:tvendelin/errorist-bootstrap.git
```

This pulls the Errorist theme as a git submodule and provides you with a skeleton
project that needs only a few things to configure. Change into project directory and start the Hugo
server:

```
cd errorist-bootstrap
hugo server -D
```

Open `http://localhost:1313` in your browser. You should see a welcome message, and a link to the
manuals. You will also notice that two languages – English and Russian – are already
pre-configured. This is done for the sake of a contrasting multilingual example, just to show you the ropes.
Languages can be easily added or removed.

Alternatively, you can clone Errorist into `themes` folder of your existing project. In this case
you will need to merge configuration from `themes/errorist/exampleSite` into your existing project.

In addition to this README file, [Errorist home page](https://vendelin.org/geeky/errorist) has 
a soft step-by-step tutorial as well as
quick introduction to YAML and Markdown. These are also included in the bootstrapping project.

## Quick Setup for the Impatient

- Open `data/authors.yaml`, read the comments, and configure one or more authors by example. It's
YAML format, so keep an eye on indentation.

- Open `config/_default/languages.yaml`, read the comments, and configure to your needs.

- If you've added new languages, you will also need to add translation files, one per new language.
Create `i18n` directory in your project root, copy the English translations file from
`themes/errorist/i18n/en.yaml` to `i18n` directory you've just created, and use it as a
template. That is, change the English translations to whatever you need. The name of this new file
must be `<LANG>.yaml`, `<LANG>` being the two-character language code from the previous step.

- If there were changes in supported languages, you will need to add/remove `index*.md` files
in the archetypes accordingly. That is, for each `index.md` file under `archetypes` directory in your project, you
will need an `index.<LANG>.md` file for each language you support. To remove these files for Russian
(if you are not going to use Russian), run

```
find archetypes -name 'index.ru.md' -exec rm '{}' \;
```

- If there were changes in supported languages, you will need to add/remove `kontent/images/_index*.md` files
accordingly. By default the only language-specific part is the file name itself, so mere copying
will do.

The content directory is preconfigured as `kontent`. This will save you quite a few keystrokes with
tab-completion on command line (`k<TAB>` for `kontent` and `c<TAB>` for `config`). If you prefer the
default `content`, edit `config/_default/config.yaml` accordingly.

### Clean up Tutorials and Examples

```
# Re-create kontent/_index.md
rm kontent/_index.md
hugo new _index.md

# Remove test image bundle
rm -r kontent/images/plain-blue

# Remove the manual
rm -r kontent/manual

# Remove the Git remote (and maybe add yours later)
git remote remove origin
```

You are ready to create content and publish your website. 

Before you do, though, have a brief look at how text content and images are handled by Errorist (the
next two sections).  Errorist will, of course, work with any other setup as far as the core functionality
of Hugo is concerned, but it will also be limited to just that.


## Adding Text Content

Errorist's key features rely on a particular page bundle structure. Here's an example with some
bells and whistles:

```
kontent/test/lesson-learned
├── homework
│   ├── 10_task.txt
│   ├── 20_mysolution.txt
│   ├── 30_solution.txt
│   └── 40_diff.txt
├── index.md
├── index.ru.md
├── main-img
├── summary.md
└── summary.ru.md
```

The English  and Russian pages are in `index*` files – as in any Hugo page bundle. 

The four `.txt` files under the `homework` sub-directory hold content for a block of
clickable tabs, identified by the directory name (`homework`). Such tab can be included in a page using
a shortcode `{{< tabs_bq "homework" >}}`. Should files contain any Markdown, it will be rendered.
For language-sensitive tabs, `*.md` files should be used instead. See the Shortcodes section for details.

The `summary.*md` files, when present, override the built-in `.Summary` page variable. This gives
you the freedom to write your summaries any way you want. Note that a good summary isn't necessarily a
continuous fragment of a page.

The file `main-img` (the name is significant) contains a reference to a page bundle with the main
image for the page with captions in all supported languages and the authors' IDs. Switching the main
image for a multilingual page is thus a matter of editing a single line in a
single file.

All of the above offloads quite a lot of noise from your Markdown and makes your content better
manageable. 

As already mentioned, Errorist will work with other supported content setups as far as the basic
functionality provided by Hugo is concerned.

## Image Management with Image Bundles

An _image bundle_ (a term specific to Errorist) is, in effect, a page bundle, stored under a
particular content section, `kontent/images` by default. Its purpose, however, is turned inside out:
the _single_ image file it includes is the main thing here. The index.*md files contain associated
texts for each supported language:

```
kontent/images/myimage
├── anyname.jpg
├── index.de.md
├── index.md
└── index.ru.md
```

The name of the image file isn't significant as long as Hugo recognizes its type as 'image'. An
image bundle is identified by its directory name, `myimage` in our example.

The only front matter parameter specific to image bundle is `alt`, which holds the same-named
attribute for the `<img>` HTML tag. The caption for the image is the `.Content` of an `index.*md`
file for the current `.Language`. The `alt` value would fall back to `.Content` if omitted:

```
---
alt: alt text for the image goes here
authors:
- tatkins
---
Image caption goes here
```

An archetype for creating an image bundle is provided. You should adjust it according to the
languages used in your website (more on this later). To add an image bundle, run

```
hugo new images/myimage -k img
```

and copy an image that you have in mind into just created image bundle directory
(`kontent/images/myimage/`).

From now on, the image can be included into one or more pages by reference to its image bundle. All
the attributes will follow it like ducklings follow their mother-duck, guarding you against the
embarrassments of mismatching image/caption/author.

### Image Bundle Directory

The directory holding image bundles (`kontent/images` by default) is defined by `.Site.Params.image_bundle_dir`
configuration parameter (see `config/_default/params.yaml`). It must be relative to `kontent`, and its
name should not begin with underscore, if you host your site on GitHub. By default, it is neither
rendered nor listed when the site is built, which is handled by `kontent/images/_index.*md` files'
front matter:

```yaml
---
draft: false
cascade:
    _build:
        list: never
        render: false
---
```

If this is the desired behavior, add a `_index.*md` file like the one above for each language that
you add.  If you want the captioned images to be displayed as content in their own right – for
example, listing them on author's page – remove cascading build configuration and create a normal
`_index.md` file instead.

Nothing prevents you, of course, from copying loose images into `static` directory or a page
bundle directory. The usual Markdown syntax will work.

## Including Images in Pages

### Image Representative of Page

```
echo 'myimage' >> kontent/section/pageBundle/main-img
```

This will make the image under `kontent/images/myimage` the 'main' image for the page, and mark it
as 'representative of page' in terms of meta- and microdata. For instance, it will be the image
people see when you share the page on a social network. 

### Images in Page Content

Use the standard Markdown syntax of `![alt](src "caption")`. If `src` does not contain a dot, an
image bundle would be looked up. Markdown texts override caption and `alt` from image bundle:

- `![](myimage)` without 'extension', the image bundle will be looked up with its caption and `alt`
text.

- `![custom alt](myimage "caption")` same as above, but with caption and `alt` text overridden from
  Markdown.

- `![custom alt](/img/simple.jpg "caption")` with 'extension', the image will be looked up as
`static/img/simple.jpg`

- `![custom alt](simple.jpg "caption")`  the image will be looked up relative to the page bundle.

- `![alt](http://example.com/external.png "caption")` an external image will be displayed.

If for whatever reason your page includes _only_ images referenced from the page content (i.e.,
there is no `main-img` file in the page bundle), you can indicate which image is the 'main' one in
terms of meta- and microdata by including `image: ` parameter in the front matter. The same rules 
for image lookup apply.

### The Default Site Image for Social Networks

This is the first element in `images:` list in `config/_default/params.yaml`

## Shortcodes for Clickable Tabs

### `tabs_bq`

Usage:

```
{{</*tabs_bq "homework" "txt" */>}}
```

Creates a block of clickable tabs from contents of `*.txt` files found in `homework` directory
within a page bundle:

```
homework
├── 10_task.txt
├── 20_mysolution.txt
├── 30_solution.txt
└── 40_diff.txt
```

The tabs will be listed alphabetically, the first tab always being active when
the page loads. The tab files can be prepended with digits and an optional underscore to define the
ordering. This prefix as well as `.txt` suffix will be stripped when determining the tab's
identifier, so `10_task.txt` will be identified as `task`. The localized tab name will be looked up
in a `i18n/*.yaml` localization files. If not found, the tab name will default to its identifier.

The Markup in the contents of tab files, if any, will be interpreted. This allows to include the
same tab content into each page translation without making duplicates for each site language, while
still being able to use Markdown.  The contents of a tab will be placed within a pair of HTML
`<blockquote>` tags, and special styling will be applied to `<del>` and `<strong>` HTML tags to
highlight corrections. 

The practical use of it is including grammar exercises in a foreign language. Having tab contents in
separate file makes piping from an external program (like git, wdiff, etc.) quite
convenient.

For language-sensitive content, use "md" as the second argument. The default is "txt", so it can be
omitted.

### `tabs`

Usage:

```
{{</*tabs "homework" "txt" */>}}
```

Same as `tabs_bq` (see above), but tabs will be wrapped in `<div>` tags, and the appearance of
`<del>` and `<strong>` HTML tags will be the default one.

## Featuring Content on the Front Page

To expose an article in the center column of the front page, add this to the front matter of the page:

```
exposures:
- major
```

To expose it in the right column instead:

```
exposures:
- minor
```

The order will be determined by the usual Hugo rules. `exposures` is a Hugo taxonomy, so
taxonomy-specific `weight` can be used when needed.

## Archetypes

An archetype is like 'cookie cutter' for certain _kind_ (a Hugo term) of content. They can be found
under `archetypes` directory in the theme root and also in the root of bootstrapping project, if you are using it.
They should likely be customized depending on languages that your site supports (see the "Adjust
Archetypes to Language Configuration" section for that part).

### Page Bundle

```
hugo new -k page blog/mypost
```

creates a page bundle `kontent/blog/mypost`:

```
kontent/blog/mypost
├── index.md
└── index.ru.md
```

### Image Bundle

```
hugo new -k img images/mypicture
```

creates an image bundle similar to page, but with different front matter parameters. You will need
to add an image file to it, of course.

### Language Learning Page Bundle

```
hugo new -k langblog learning-indonesian/pronouns
```

creates a specialized page bundle for a language-learning blog:

```
kontent/learning-indonesian/pronouns
├── homework
│   ├── 10_task.txt
│   ├── 20_mysolution.txt
│   ├── 30_solution.txt
│   └── 40_diff.txt
├── index.md
└── index.ru.md
```

This will additionally create a skeleton for clickable tabs representing various stages of solving a
grammar exercise. If you manage your homework using Git/GitHub, you can pipe the different commits
into respective files, and a `wdiff` between your solution and the correct one. And then tell the
world about your accomplishment in all the languages you already speak!



## Multilingual Configuration

### Languages that Your Site Supports

Edit the `config/_default/languages.yaml` file. The example configuration includes two languages,
English and Russian, already pre-configured (add or delete as necessary):

```yaml
en:
    languageName: English
    weight: 10
    locale: en_US
ru:
    languageName: Русский
    weight: 20
    locale: ru_RU
```

The keys (`en`, `ru` in the example) should be ISO-639 language codes, as these will be used in metadata.

- `languageName:` the name of a language in that language (see example for Russian)

- `weight:` a integer used for ordering languages in a list.
Lower weight = higher position. Use gapped numbering for easier inserts
(i.e. 10, 20, 30, ... as opposed to 1, 2, 3, ...).

- `locale:` a combination of ISO-639 language code and ISO-3166 country code
joined with underscore. Currently used only in `og:locale` meta tag.

### Add or Remove the Localizations (Translations)

The translations can be found under `i18n` directory in the theme root:

```
themes/errorist/i18n/
├── en.yaml
└── ru.yaml
```

The file names correspond to the YAML keys in `config/_default/languages.yaml` file. 
To add string translations for another language you are going to use, create an `i18n` directory
under your project root, and create additional translations files for the missing languages there
(not in the theme!), naming
the files accordingly. So, if you happen to add Estonian, you should create `i18n/ee.yaml` in your
project.

```
cp themes/errorist/i18n/en.yaml i18n/ee.yaml
# edit i18n/ee.yaml
```

If you are going to add localized strings in your project (author names, clickable tabs, etc.), you
will need to create translation files even for the languages supported by the theme. The
translations in the theme and in your project will be merged, and your translation will win, should
there be any conflict.

### Adjust Archetypes to Language Configuration

This is the structure of `archetypes` directory:

```
archetypes/
├── default.md
├── img
│   ├── index.md
│   └── index.ru.md
├── langblog
│   ├── homework
│   │   ├── 10_task.txt
│   │   ├── 20_mysolution.txt
│   │   ├── 30_solution.txt
│   │   └── 40_diff.txt
│   ├── index.md
│   └── index.ru.md
└── page
    ├── index.md
    └── index.ru.md
```

For each additional language your website uses, you will need an `index.<LANG>.md` file, where
`<LANG>` is the language key from `config/_default/languages.yaml` file. Since the supplied
`index.md` files are language-independent, you just need to copy them, adjusting the file name.

Finally, if you are not going to use Russian, you should remove the corresponding files from
archetypes:

```
find archetypes -name 'index.ru.md' -exec rm '{}' \;
```

## Managing Author(s)

Authors are referred to from the front matter as a list of their IDs (there could be multiple
authors):

```yaml
authors:
- tatkins
- mmustermann
```

Before referring to authors, you'll have to configure them. 
If an author with a particular ID doesn't exist, an exception will be thrown.

### Add Data Entries for the Authors

Open `data/authors.yaml` in a text editor and add the author(s). The example file can be copied from
`themes/errorist/exampleSite/data/authors.yaml`. If you are using the bootstrapping project, it's
already there.

The top-level key is a unique identifier for an author in ASCII alphanumeric characters
starting with a letter. All keys below are, strictly speaking, optional. Omitting them, however,
won't make your site look prettier.

- `name:` key should contain a fall-back name which will be displayed
should there be no author's page (`kontent/authors/<ID>/index.md`) for a particular `.Language`,
or should the `.Title` of such page be not defined. 

- `image:` can be either local (the path should be relative to `<PROJECT DIR>/static`)
or an URL, as in example below

- `homepage:` is the primary external URL of an author

- `social:` is a list of objects holding external URLs related to an author,
typically social network profiles. The `name:` will be translated or displayed as-is 
depending on whether translation is provided under i18n directory.

Below are a few examples using 'default persons' from various cultures:

```yaml
authors:
  tatkins:
    name: 'Tommy Atkins'
  mmustermann:
    name: 'Max Mustermann'
    image: /img/mmustermann.jpg
    homepage: http://example.com/dipl-ingeneur-informatiker/mmustermann
    social:
    - name: LinkedIn
      url: http://linkedin.com/mmustermann
    - name: Xing
      url: http://xing.com/mmustermann
  vpupkin:
    name: 'Vasya Pupkin'
    image: https://gravatar.com/avatar?d=mp&s=200
    homepage: http://example.com/vpupkin
  anonymous:
```

### Create Authors' Pages in All Supported Languages

```
hugo new -k page authors/<ID>
```

### Content Listing in the Author's Page 

If a page is written by the same author as the parent page, it will be skipped.  That is, if some of
your authors (or you) will write a multi-part article or a book that will occupy an entire
(sub)section, only the top page of it will be listed. 

Similarly, it won't make a lot of sense specifying the same author(s) in the front matter of each
single chapter. Instead, you would rather put this in the front matter of the `_index.md` of the
said opus:

```
cascade:
    authors:
    - mmustermann
```


## Overriding the Defaults

Do not make changes to the Errorist theme directly, because these will likely mess up the upgrading
process. Instead, override them using respective directories in your project.

### Dummy Partials to Override

These sit under `themes/errorist/layouts/partials` directory. If you have forked the bootstrapping
project as recommended, these files are already included in `layouts/partials`. Otherwise, you will
need to copy or create them yourself.

- `disqus.html` if you plan to include Disqus comments. Just copy the code you've got from them, and
  the comments will be enabled on each page rendered with `single.html`.
- `favicons.html` to include all HTML related to your site's [favicon
  images](https://en.wikipedia.org/wiki/Favicon). To get both the images, and the HTML to
  include them you may choose to use a free online service, like
  [https://realfavicongenerator.net](https://realfavicongenerator.net).
- `gdpr.html` for the user consent widget which lets the user to accept cookies, agree to being
  tracked and what not. I'm not strong in international privacy legalese, so I'm not including such
  code on purpose.
- `head.html`  to customize the `<title>` of your pages and for anything else you might need to
  include between the `<head>` tags. 

### Customizing the Appearance

Copy `themes/errorist/static/css/customized.css` to `static/css/customized.css` in your project and
edit it. This will allow you to change the color of the stripe in the top of the page, the color of
your site name, and whether you'd like to display it in uppercase. 

You can also change how images in articles behave on mouse-over, hinting the user they can be
expanded.

### Choosing the Layout

You can change the layout of the pages rendered with `list.html` template by assigning a custom type
in `_index.*md` file in the section root. The types supported are:

- `list-compact` a more compact list, as the name suggests, still including `.Description` for the
  pages listed.
- `list-titles-only` same as above, but only titles are shown. This is the default for tags.

The plan is to include alternative layouts for the site `index.html` pages.

## Metadata and Microdata 

Currently, only `BreadCrumbs` and `Article` with its derivatives (`BlogPosting`, `NewsArticle`, etc.)
are supported. The type of the main content can be set in front matter with `schema:` parameter, the
default being `Article`.

### Canonical Meta Tag

By default it is set to the `.Permalink` of the page itself. Should it be something different, set
`canonical` parameter in the front matter. 

## Reporting Bugs, Requesting Features, Pull Requests and Other Communication

Please use GitHub repository issues for that. I might occasionally respond to posts at Hugo support
forum, but I can easily overlook your posts as well. Please keep in mind that I'm running this
project in my free time.
