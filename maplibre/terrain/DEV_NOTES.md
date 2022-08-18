```bash
find -type d | parallel -j 24 mogrify -format png -fill \"#0186a0\" -opaque \"#00000a\" '{}/*.png'
find -type d | parallel -j 24 mogrify -format png -alpha off -fill \"#0186a0\" -opaque \"#000000\" '{}/*.png'
```
