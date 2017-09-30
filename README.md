URL Shortener Microservice
==

 [Follow @koojam_pk on Twitter](https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ffollow-button&amp;ref_src=twsrc%5Etfw&amp;region=follow_link&amp;screen_name=koojam_pk&amp;tw_p=followbutton)

 [Developer's website](https://www.pakkianlew.com)

### User Stories:
> 1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
> 2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
> 3. When I visit that shortened URL, it will redirect me to my original link.

### Example Usage
https://cold-captain.glitch.me/api/https://www.google.com
https://cold-captain.glitch.me/api/http://foo.com:80

### Example Output
```{"original_url":"https://www.google.com","short_url":"https://cold-captain.glitch.me/8"}```
```{"original_url":"http://foo.com:80","short_url":"{fullUrl}/9"}```

### Usage
https://cold-captain.glitch.me/9

### Will redirect to:
http://foo.com:80