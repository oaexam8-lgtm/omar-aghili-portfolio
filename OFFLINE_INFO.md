# 🌐 اطلاعات آفلاین و وابستگی‌ها

## 📊 وضعیت فعلی

این پروژه **تقریباً** بدون نیاز به اینترنت کار می‌کند، با یک استثنا:

---

## ✅ چیزهایی که بدون اینترنت کار می‌کنند:

### 1. 📁 فایل‌های محلی (Local Files)
```
✅ HTML (index.html)
✅ CSS (css/style.css)
✅ JavaScript (js/script.js)
✅ تصاویر (images/*)
✅ تنظیمات فونت (assets/fonts/fonts.css)
```

### 2. 🎨 استایل‌ها و انیمیشن‌ها
```
✅ تمام CSS ها
✅ انیمیشن‌ها
✅ Responsive Design
✅ تم تاریک/روشن
```

### 3. ⚙️ قابلیت‌های JavaScript
```
✅ تغییر زبان
✅ تغییر تم
✅ Typing Effect
✅ Scroll Animations
✅ فرم Validation
✅ Mobile Menu
```

---

## ⚠️ چیزهایی که نیاز به اینترنت دارند:

### 1. 🎭 آیکون‌ها (Font Awesome)
```
❌ نیاز به اینترنت دارد
📍 لینک: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css
📦 حجم: ~75 KB
```

**آیکون‌های استفاده شده:**
- fa-moon, fa-sun (تم)
- fa-bars (منو)
- fa-chevron-down, fa-arrow-up (اسکرول)
- fa-html5, fa-css3-alt, fa-js, fa-git-alt, fa-github, fa-mobile-alt (مهارت‌ها)
- fa-github, fa-linkedin, fa-envelope (شبکه‌های اجتماعی)
- fa-external-link-alt (پروژه‌ها)

### 2. 🔤 فونت‌ها (Google Fonts)
```
❌ نیاز به اینترنت دارد
📍 Inter: برای متن انگلیسی
📍 Vazirmatn: برای متن فارسی
📦 حجم: ~150 KB
```

---

## 💡 چرا از CDN استفاده می‌کنیم؟

### مزایا:
- ✅ سرعت بارگذاری بیشتر (Cache شده در مرورگر)
- ✅ حجم پروژه کمتر
- ✅ به‌روزرسانی خودکار
- ✅ استاندارد برای GitHub Pages

### معایب:
- ❌ نیاز به اینترنت برای بار اول
- ❌ وابستگی به سرویس خارجی

---

## 🔧 اگر می‌خواهید 100% آفلاین باشد:

### گام 1: دانلود Font Awesome
```bash
1. برید به: https://fontawesome.com/download
2. دانلود کنید (Free for Web)
3. فایل‌ها را در assets/fontawesome قرار دهید
```

### گام 2: تغییر لینک در index.html
```html
<!-- قبل (CDN) -->
<link rel="stylesheet" href="https://cdnjs...font-awesome/6.6.0/css/all.min.css">

<!-- بعد (محلی) -->
<link rel="stylesheet" href="assets/fontawesome/css/all.min.css">
```

### گام 3: دانلود فونت‌ها
```bash
1. برید به: https://fonts.google.com
2. دانلود کنید: Inter و Vazirmatn
3. فایل‌های .woff2 را در assets/fonts قرار دهید
4. fonts.css را به‌روز کنید
```

---

## 📊 مقایسه سرعت:

| روش | بار اول | بارهای بعدی | حجم پروژه |
|-----|---------|-------------|-----------|
| **CDN** (فعلی) | 2-3 ثانیه | < 1 ثانیه | ~500 KB |
| **Local** (محلی) | 1-2 ثانیه | < 1 ثانیه | ~2 MB |

---

## 🎯 توصیه:

برای **GitHub Pages** و استفاده عمومی، استفاده از **CDN** بهتر است چون:
- سریع‌تر است
- حجم repository کمتر
- Cache شده در مرورگر کاربران
- به‌روزرسانی آسان‌تر

---

## ✅ نتیجه:

پروژه فعلی با **CDN** کار می‌کند که:
- ✅ برای GitHub Pages عالی است
- ✅ سریع است
- ✅ حجم کم دارد
- ⚠️ نیاز به اینترنت دارد (اولین بار)

اگر نیاز به نسخه کاملاً آفلاین دارید، مراحل بالا را دنبال کنید.

---

**تاریخ به‌روزرسانی:** 2025-06-13
