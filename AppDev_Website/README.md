#### Check Performance of Website
https://developers.google.com/speed/pagespeed/insights/

#### Image Optimization
https://tinyjpg.com/

#### Svg Optimization
https://jakearchibald.github.io/svgomg/

#### Animation (After Effects)
https://aescripts.com/bodymovin/

# SEO
Next.js

Open Graph Tags

Canonical/Meta Tags

robots.txt & sitemap.xml

###### curl googlebot
curl --user-agent "Googlebot/2.1 (+http://www.google.com/bot.html)" -v localhost:3000

https://gist.github.com/chrisle/2252209

###### Next.js
https://github.com/mui-org/material-ui/tree/master/examples/nextjs

curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/nextjs

###### optimized images
https://github.com/cyrilwanner/next-optimized-images

###### add title tag for each page
<title key="title">About Us Page | Website name</title>

###### add meta description tag for each page
<meta name="description"
          key="description"
          content="We provide the fastest, most modern, affordable, and aesthetic software design and development services."
        />

###### add open graph tag for each page
<meta property="og:url"
    key="og:url"
    content="https://arcsoftwaredevelopment.com/about"
    />

###### add canonical tags for each page
<link href="https://localhost:3000/about"
          rel="canonical"
          key="canonical"
        />

# Meta Tags
 <meta charSet="utf-8" />
 
<link rel="shortcut icon" href="favicon.png" />

<meta
name="viewport"
content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/>

{/* PWA primary color */}
<meta name="theme-color" content={theme.palette.primary.main} />

<meta
property="og:title"
key="og:title"
content="Web development services"
/>

<meta property="og:type" content="website" />

<meta property="og:image" content="https://localhost/sample.png" />

<meta property="og:image:type" content="image/png" />

<meta property="og:image:width" content="1200" />

<meta property="og:image:height" content="630" />

<meta property="og:image:alt" content="company logo" />

# lazy load image
https://www.npmjs.com/package/react-lazy-load-image-component

