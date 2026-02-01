# FCL Product Demo Voiceover Script
# Total Duration: 25 seconds
# Matches video scene timing

## Full Script (for API call)

"Welcome to First Class Learning Camberley. Your trusted partner in education.

We offer expert tuition in Maths, English, and Science.

Our Mathematics programme builds fundamental skills for success, from core arithmetic to GCSE problem solving.

Our English programme provides comprehensive coverage, from reading and grammar to creative writing.

Our Science programme delivers proven results across Chemistry, Physics, and Biology.

With over 300 centres nationwide, we're part of the UK's leading tuition franchise.

Start your child's journey today. Book a free consultation at firstclasslearning.co.uk"

## Scene Breakdown

| Time | Scene | Voiceover |
|------|-------|-----------|
| 0-3.5s | Intro | "Welcome to First Class Learning Camberley. Your trusted partner in education." |
| 3.5-7s | Services | "We offer expert tuition in Maths, English, and Science." |
| 7-10.5s | Maths | "Our Mathematics programme builds fundamental skills for success, from core arithmetic to GCSE problem solving." |
| 10.5-14s | English | "Our English programme provides comprehensive coverage, from reading and grammar to creative writing." |
| 14-17.5s | Science | "Our Science programme delivers proven results across Chemistry, Physics, and Biology." |
| 17.5-21s | Stats | "With over 300 centres nationwide, we're part of the UK's leading tuition franchise." |
| 21-25s | CTA | "Start your child's journey today. Book a free consultation at firstclasslearning.co.uk" |

## API Call to Generate Voiceover

Run this command locally to generate the voiceover:

```bash
curl -X POST "https://api.wavespeed.ai/api/v3/elevenlabs/eleven-v3" \
  -H "Authorization: Bearer 2cfe564e46748e4217ce5c38fa3213fe61479fdacd40945bdc4c3794b8fe81f5" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to First Class Learning Camberley. Your trusted partner in education. We offer expert tuition in Maths, English, and Science. Our Mathematics programme builds fundamental skills for success, from core arithmetic to GCSE problem solving. Our English programme provides comprehensive coverage, from reading and grammar to creative writing. Our Science programme delivers proven results across Chemistry, Physics, and Biology. With over 300 centres nationwide, we are part of the UK leading tuition franchise. Start your childs journey today. Book a free consultation at firstclasslearning.co.uk",
    "voice_id": "21m00Tcm4TlvDq8ikWAM",
    "stability": 0.5,
    "similarity": 0.75
  }' --output voiceover.mp3
```

Then move voiceover.mp3 to `fcl-demo/public/audio/`
