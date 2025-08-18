# Virtual Garden - Complete Wireframes Documentation

This document contains wireframes for all pages and components in the Virtual Garden application.

## 1. Authentication Pages

### Onboarding Screen
```
┌─────────────────────────────────────────────────────────────┐
│                    [🌱 Virtual Garden Logo]                 │
│                                                             │
│              Transform your gardening experience            │
│                   with AI-powered tools                     │
│                                                             │
│             [Start Gardening]  [Sign In]                   │
│                                                             │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│   │     📷      │  │     🧠      │  │     🎨      │      │
│   │AI Plant     │  │Smart Garden │  │Virtual      │      │
│   │Recognition  │  │Analysis     │  │Garden Design│      │
│   └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                             │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│   │     ✨      │  │     👥      │  │     🏆      │      │
│   │Gamified     │  │Community    │  │Expert       │      │
│   │Experience   │  │Gardens      │  │Guidance     │      │
│   └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                             │
│              [Statistics Section]                          │
│          10K+ Plants • 5K+ Gardeners • 500+ Species       │
└─────────────────────────────────────────────────────────────┘
```

### Login Screen
```
┌───────────────────��─────────────────────────────────────────┐
│                    [🌱 Virtual Garden]                     │
│                   Welcome back, gardener!                  │
│                                                             │
│              🌱 Try the Demo                               │
│     Click "Demo Login" or use: demo@garden.com / demo123   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐ │
│   │ Email: [_________________________]                  │ │
│   │ Password: [_____________________] 👁                │ │
│   │                                                     │ │
│   │              [Sign In]                              │ │
│   │                                                     │ │
│   │        ──────── Or continue with ────────          │ │
│   │                                                     │ │
│   │     [Demo Login]        [🔍 Google]                │ │
│   │                                                     │ │
│   │         Don't have an account? Sign up              │ │
│   └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Register Screen
```
┌─────────────────────────────────────────────────────────────┐
│                    [🌱 Virtual Garden]                     │
│                   Join the garden community!               │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐ │
│   │ First Name: [______________] Last Name: [___________] │ │
│   │ Email: [_________________________]                  │ │
│   │ Username: [_____________________]                   │ │
│   │ Password: [_____________________] 👁                │ │
│   │ Confirm: [______________________] 👁                │ │
│   │                                                     │ │
│   │ ☐ I agree to Terms of Service                      │ │
│   │                                                     │ │
│   │              [Create Account]                       │ │
│   │                                                     │ │
│   │        ──────── Or continue with ────────          │ │
│   │                                                     │ │
│   │               [🔍 Google]                          │ │
│   │                                                     │ │
│   │         Already have an account? Sign in            │ │
│   └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 2. Main Application Layout

### Sidebar Navigation
```
┌─────────────────���
│ 🌱 Virtual      │
│    Garden       │
│ AI-Powered      │
│                 │
│ 🏠 Dashboard    │
│ 🌿 My Gardens   │
│ 👥 Community    │
│ 🛒 Store        │
│ 👤 Profile      │
│                 │
│ ┌─────────────┐ │
│ │    ✨       │ │
│ │Start Growing!│ │
│ │Create your  │ │
│ │first garden │ │
│ └─────────────┘ │
│                 │
│ [U] Demo User   │
│     Level 5     │
│ [Sign out]      │
└─────────────────┘
```

## 3. Dashboard Page

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Welcome back, HITESH! 🌱                              [+ New Garden]           │
│ Your virtual gardens are thriving. Ready to grow something new?                 │
│                                                                                 │
│ ┌─────────────┐  ┌─────────────┐  ┌────────────���┐                            │
│ │ Total Plants│  │Healthy Plants│  │Ready to     │                            │
│ │     3       │  │     3        │  │Harvest      │                            │
│ │ 🌿 4 gardens│  │ 💧 100% healthy│ │  0          │                            │
│ └─────────────┘  └─────────────┘  └─────────────┘                            │
│                                                                                 │
│ 🌿 My Gardens                                           View All               │
│ ┌───────────────────────────────────────────────────────────────────────────┐ │
│ │ [🌿] My First Garden                               outdoor        [👁]     │ │
│ │      A beautiful starter garden with roses...                             │ │
│ │      🌲 5 plants  💧 4 healthy  📅 Aug 19                                │ │
│ └───────────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────────────────────────────────────┐ │
│ │ [🌿] Boston Fern Garden                            indoor         [👁]     │ │
│ │      The garden features a modern, minimalist...                          │ │
│ │      🌲 12 plants  💧 8 healthy  📅 Aug 19                               │ │
│ └───────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘

Recent Activity Section:
┌─────────────────────────────────┐
│ 📈 Recent Activity              │
│                                 ��
│ 💧 Watered Dracaena             │
│    2 hours ago                  │
│                                 │
│ 🌿 Watered Fern                 │
│    4 hours ago                  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │      Garden Level           │ │
│ │       Level 3               │ │
│ │   ████████░░  75%           │ │
│ │     750/1000 XP             │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## 4. My Gardens Page

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ My Gardens                                              [+ New Garden]          │
│ Manage your virtual gardens and watch them grow                                 │
│                                                                                 │
│ [🔍 Search gardens...]                                                         │
│                                                                                 │
│ [All Types ▼] [indoor] [outdoor] [balcony] [greenhouse] [⚙] [⋮]              │
│                                                                                 │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                            │
│ │[Garden Image]│  │[Garden Image]│  │[Garden Image]│                            │
│ │             │  │             │  │             │                            │
│ │Sunny Balcony│  │Indoor Jungle│  │Boston Fern  │                            │
│ │Oasis        │  │             │  │Garden       │                            │
│ │             │  │             │  │             │                            │
│ │A small sun- │  │My collection│  │The garden   │                            │
│ │drenched     │  │of indoor    │  │features a   │                            │
│ │balcony...   │  │plants...    │  │modern...    │                            │
│ │             │  │             │  ��             │                            │
│ │🌲 0 Plants  │  │🌲 0 Plants  │  │🌲 3 Plants  │                            │
│ │💧 0 Watering│  │💧 0 Watering│  │💧 3 Watering│                            │
│ │             │  │             │  │             │                            │
│ │Created Aug  │  │Created Aug  │  │Created Aug  │                            │
│ │18, 2025     │  │18, 2025     │  │18, 2025     │                            │
│ │             │  │             │  │             │                            │
│ │[balcony]    │  │[indoor]     │  │[outdoor]    │                            │
│ └─────────────┘  └─────────────┘  └─────────────┘                            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 5. Store Page

```
┌─────────────────────────────────────────────���───────────────────────────────────┐
│ Store                                                                           │
│ Everything you need for your virtual garden                                     │
│                                                                                 │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│ │[Rose Seeds] │  │[Sunflower   │  │[Tulip Bulbs]│  │[Baby Cactus]│            │
│ │Beautiful    │  │Seeds]       │  │Colorful     │  │Low          │            │
│ │red rose     │  │Bright yellow│  │tulip bulbs  │  │maintenance  │            │
│ │seeds...     │  │sunflower... │  │for spring...│  │succulent... │            │
│ │growth boost │  │growth boost │  │growth boost │  │health boost │            │
│ │+10          │  │+15          │  │+20          │  │+25          │            │
│ │💰 25       │  │💰 20        │  │💰 30        │  │💰 50        │            │
│ │[Buy Now]    │  │[Buy Now]    │  │[Buy Now]    │  │[Buy Now]    │            │
│ └─────────────┘  └─────────────┘  └─────────────┘  └────���────────┘            │
│                                                                                 │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│ │[✨ Lucky    │  │[⭐ Garden   │  │[💧 Watering │  │[⚡ Super    │            │
│ │Bamboo]      │  │Gnome]       │  │Can]         │  │Fertilizer]  │            │
│ │Bring good   │  │Adorable     │  │Essential for│  │Advanced     │            │
│ │luck and     │  │garden gnome │  │keeping your │  │nutrient     │            │
│ │positive     │  │to watch over│  │plants       │  │boost plant  │            │
│ │energy...    │  │your plants  │  │hydrated     │  │growth       │            │
│ │health boost │  │decoration +5│  │growth boost │  │growth boost │            │
│ │+40          │  │             │  │+5           │  │+15          │            │
│ │💰 [Buy Now] │  │💰 [Buy Now] │  │💰 [Buy Now] │  │💰 [Buy Now] │            │
│ └─────────────┘  └───���─────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 6. Profile Page

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           HITESH SURYA                                         │
│                      hiteshsurya018@gmail.com                                  │
│ [H]                    Level 1 ⭐ 115 Coins  ████░░  100 XP                  │
│                                                                                 │
│ 📊 Garden Statistics                     🏆 Achievements                       │
│                                                                                 │
│ ┌─────────────┐  ┌─────────────┐        ┌─────────────────────────────────┐  │
│ │      4      │  │      3      │        │ 🥇 First Garden                 │  │
│ │ Gardens     │  │ Plants Grown│        │    Created your first virtual   │  │
│ │ Created     │  │             │        │    garden                       │  │
│ └─────────────┘  └─────────────┘        └─────────────────────────────────┘  │
│                                                                                 │
│ ┌─────────────┐  ┌─────────────┐        ┌─────────────────────────────────┐  │
│ │      3      │  │    100%     │        │ 🌱 Green Thumb                  │  │
│ │ Healthy     │  │ Success Rate│        │    Maintained 5 healthy plants  │  │
│ │ Plants      │  │             │        └─────────────────────────────────┘  │
│ └─────────────┘  └──────���──────┘                                               │
│                                         ┌─────────────────────────────────┐  │
│                                         │ 🧑‍🌾 Master Gardener             │  │
│ ⚙️ Settings                            │    Successfully grew 10 plants  │  │
│                                         │    to maturity                  │  │
│ 📧 Push Notifications                   └─────────────────────────────────┘  │
│    [Toggle Switch: ON]                                                         │
│                                         ┌─────────────────────────────────┐  │
│ 🌙 Dark Mode                           │ 🏆 Plant Whisperer              │  │
│    [Toggle Switch: OFF]                 │    [Locked - Grow 25 plants]   │  │
│                                         └─────────────────────────────────┘  │
│ 🔔 Email Notifications                                                        │
│    [Toggle Switch: ON]                                                         │
│                                                                                 │
│ 🗣️ Language                                                                   │
│    [English ▼]                                                                │
│                                                                                 │
│ 🔐 Privacy Settings                                                           │
│    [Manage Privacy]                                                            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 7. Community Page

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ 🎯 Garden Challenges                          👥 Friends                       │
│                                               [+ Add Friend]                   │
│ ┌��────────────────────────────────────────┐                                   │
│ │ 🌹 Rose Enthusiast          [125 days left] │   ┌─────────────────────────┐ │
│ │ Show your love for roses by growing      │   │ 👤 Friends (0)           │ │
│ │ one in your garden                       │   │                         │ │
│ │                                          │   │ 📨 Requests (0)         │ │
│ │ Goal: Grow a Rose                        │   │                         │ │
│ │ Reward: 💰 100 Coins ⭐ 50 XP           │   │                         │ │
│ │ [Accept Challenge]                       │   │     No friends yet      │ │
│ └─────────────────────────────────────────┘   │ Add friends to see their │ │
│                                               │ gardens!                │ │
│ ┌─────────────────────────────────────────┐   └─────────────────────────��� │
│ │ 🏡 Balcony Gardener        [134 days left] │                               │
│ │ Create a beautiful and cozy balcony      │                               │
│ │ garden                                   │                               │
│ │                                          │                               │
│ │ Goal: Create a balcony garden            │                               │
│ │ Reward: 💰 150 Coins ⭐ 75 XP           │                               │
│ │ [Accept Challenge]                       │                               │
│ └─────────────────────────────────────────┘                               │
│                                                                                 │
│ ┌─────────────────────────────────────────┐                                   │
│ │ 🩺 Health Inspector        [181 days left] │                               │
│ │ Prove your gardening skills by having    │                               │
│ │ 5 healthy plants at once                │                               │
│ │                                          │                               │
│ │ Goal: Have 5 healthy plants              │                               │
│ │ Reward: 💰 200 Coins ⭐ 100 XP          │                               │
│ │ [Accept Challenge]                       │                               │
│ └─────────────────────────────────────────┘                               │
│                                                                                 │
│ ┌─────────────────────────────────────────┐                                   │
│ │ 🌱 Sprouting Up           [119 days left] │                               │
│ │ Begin your journey and reach level 2     │                               │
│ │                                          │                               │
│ │ Goal: Reach level 2                      │                               │
│ │ Reward: 💰 50 Coins ⭐ 25 XP            │                               │
│ │ [Accept Challenge]                       │                               │
│ └─────────────────────────────────────────┘                               │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 8. Garden View (Individual Garden)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ← Back to Gardens          My First Garden                        [⚙] [⋮]      │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │                          3D Garden View                                     │ │
│ │                                                                             │ │
│ │     🌹        🌻        🌷                                                  │ │
│ │      │         │         │                                                  │ │
│ │    Rose    Sunflower   Tulip                                               │ │
│ │                                                                             │ │
│ │                    [🎮 Controls]                                            │ │
│ │                 Rotate | Zoom | Pan                                        │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│ 🌿 Plants in this Garden                              [+ Add Plant]             │
│                                                                                 │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                            │
│ │[🌹 Rose]    │  │[🌻 Sunflower]│  │[🌷 Tulip]   │                            │
│ │ Health: ●●●●○│  │ Health: ●●●●● │  │ Health: ●●●○○│                            │
│ │ Age: 30 days │  │ Age: 45 days │  │ Age: 15 days │                            │
│ │ Status:      │  │ Status:      │  │ Status: Needs│                            │
│ │ Blooming     │  │ Mature       │  │ Water        │                            │
│ │              │  │              │  │              │                            │
│ │ [💧 Water]   │  │ [🌟 Harvest] │  │ [💧 Water]   │                            │
│ │ [🔍 Inspect] │  │ [🔍 Inspect] │  │ [🔍 Inspect] │                            │
│ └─────────────┘  └─────────────┘  └─────────────┘                            │
│                                                                                 │
│ 📊 Garden Statistics                                                           │
│ • Total Plants: 3                                                              │
│ • Healthy Plants: 2                                                            │
│ • Ready to Harvest: 1                                                          │
�� • Garden Level: 5                                                              │
│ • Last Watered: 2 hours ago                                                    │
└─────────���───────────────────────────────────────────────────────────────────────┘
```

## 9. Plant Identification (AI Feature)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ 📷 AI Plant Recognition                                                         │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │                           Camera View                                       │ │
│ │                                                                             │ │
│ │                      [Captured Plant Image]                                │ │
│ │                                                                             │ │
│ │                     [📷 Take Photo] [📁 Upload]                            │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│ 🔍 Identification Results                                                       │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ 🌹 Rosa rubiginosa (Sweet Briar Rose)                                      │ │
│ │ Confidence: 94%                                                             │ │
│ │                                                                             │ │
│ │ 📝 Care Instructions:                                                       │ │
│ │ • Water: Moderate, allow soil to dry between waterings                     │ │
│ │ • Light: Full sun to partial shade                                         │ │
│ │ • Soil: Well-draining, slightly acidic to neutral                          │ │
│ │ • Temperature: Hardy in zones 4-9                                          │ │
│ │ • Fertilizer: Monthly during growing season                                │ │
│ │                                                                             │ │
│ │ 🌱 Growth Information:                                                       │ │
│ │ • Mature Height: 6-10 feet                                                 │ │
│ │ • Bloom Time: Late spring to early summer                                  │ │
│ │ • Flower Color: Pink with yellow center                                    │ │
│ │                                                                             │ │
│ │ [+ Add to Garden] [📤 Share] [💾 Save Info]                               │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────��─────────────────────────────────────────────────┘
```

## 10. Garden Space Recreation (AI Feature)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ 🏡 Garden Space Recreation                                                      │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │                     Upload Garden Photo                                     │ │
│ │                                                                             │ │
│ │              [Drag & Drop or Click to Upload]                              │ │
│ │                                                                             │ │
│ │                     Supported: JPG, PNG, HEIC                              �� │
│ │                        Max size: 10MB                                      │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│ 🔄 Processing Status                                                            │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ ✅ Image uploaded successfully                                               │ │
│ │ 🔄 Analyzing spatial layout...                    ████████░░ 80%            │ │
│ │ ⏳ Detecting plants and objects...                ██████░░░░ 60%            │ │
│ │ ⏳ Creating 3D reconstruction...                  ████░░░░░░ 40%            │ │
│ │ ⏳ Generating interactive model...                ██░░░░░░░░ 20%            │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│ 🎯 Detection Results                                                            │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ Detected Objects:                                                           │ │
│ │ • 3 Plants (Fern, Rose Bush, Small Tree)                                   │ │
│ │ • 1 Garden Bench                                                           │ │
│ │ • 2 Plant Pots                                                             │ │
│ │ • 1 Pathway                                                                │ │
│ │ • Fence boundary                                                           │ │
│ │                                                                             │ │
│ │ Garden Dimensions: 12ft x 8ft                                              │ │
│ │ Style: Contemporary cottage garden                                          │ │
│ │                                                                             │ │
│ │ [🎮 View in 3D] [📝 Edit Layout] [💾 Save Garden]                         │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 11. Mobile Responsive Breakpoints

### Mobile Layout (320px - 768px)
```
┌─────────────────┐
│ ☰ Virtual Garden│
│                 │
│ Welcome HITESH  │
│                 │
│ ┌─────────────┐ │
│ │Total Plants │ │
│ │     3       │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │Healthy      │ │
│ │     3       │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │Ready to     │ │
│ │Harvest: 0   │ │
│ └─────────────┘ │
│                 │
│ My Gardens      │
│ ┌─────────────┐ │
│ │[Garden Card]│ │
│ │             │ │
│ └─────────────┘ │
│                 │
│ [+ New Garden]  │
└─────────────────┘
```

### Tablet Layout (768px - 1024px)
```
┌─────────────────────────────────────────────┐
│ 🌱 Virtual Garden              [+ New Garden]│
│                                              │
│ Welcome back, HITESH!                        │
│                                              │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│ │ Total   │ │ Healthy │ │ Ready   │         │
│ �� Plants  │ │ Plants  │ │ Harvest │         │
│ │   3     │ │   3     │ │   0     │         │
│ └─────────┘ └─────────┘ └─────────┘         │
│                                              │
│ My Gardens                                   │
│ ┌─────────────────────────────────────────┐  │
│ │ [Garden Card with Image]                │  │
│ └─────────────────────────────────────────┘  │
│                                              │
│ Recent Activity                              │
│ ┌─────────────────────────────────────────┐  │
│ │ Activity Feed                           │  │
│ └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## 12. Component States

### Loading States
```
┌─────────────────────────────────────────────┐
│ ⏳ Loading Dashboard...                     │
│                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│        │
│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│        │
│ └─────────┘ └─────────┘ └─────────┘        │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ │
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ │
│ └─────────────────────────────────────────┘ │
└─────────��───────────────────────────────────┘
```

### Error States
```
┌─────────────────────────────────────────────┐
│ ❌ Error Loading Gardens                    │
│                                             │
│ Unable to load your gardens. Please check   │
│ your connection and try again.              │
│                                             │
│ [🔄 Retry] [📞 Contact Support]            │
└─────────────────────────────────────────────┘
```

### Empty States
```
┌─────────────────────────────────────────────┐
│ 🌱 No Gardens Yet                           │
│                                             │
│ Start your gardening journey by creating    │
│ your first virtual garden!                  │
│                                             │
│ [+ Create Your First Garden]               │
└─────────────────────────────────────────────┘
```

---

## Design System Notes

### Color Palette
- Primary Green: #10B981 (emerald-500)
- Secondary Blue: #3B82F6 (blue-500)
- Accent Purple: #8B5CF6 (violet-500)
- Background: Gradient from green-50 to purple-50
- Text: gray-900 for headings, gray-600 for body

### Typography
- Headings: Font-bold, various sizes (text-xl to text-5xl)
- Body: Font-medium for labels, regular for content
- Accent: Font-semibold for important information

### Spacing
- Container: mx-auto px-4 py-8
- Card spacing: p-6
- Grid gaps: gap-6 for large grids, gap-4 for compact

### Interactive Elements
- Buttons: Rounded corners, hover states, focus rings
- Cards: Hover shadows, smooth transitions
- Icons: Consistent 16px (w-4 h-4) and 24px (w-6 h-6) sizes

This wireframe documentation covers all major pages and components in the Virtual Garden application, providing a complete reference for the UI structure and layout patterns.
