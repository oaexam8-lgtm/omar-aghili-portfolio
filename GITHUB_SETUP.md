# 🚀 راهنمای آپلود به GitHub

این راهنما به شما کمک می‌کند تا پروژه را به صورت حرفه‌ای در GitHub منتشر کنید.

---

## 📋 پیش‌نیازها

1. ✅ حساب GitHub داشته باشید
2. ✅ Git روی سیستم نصب باشد
3. ✅ Git config تنظیم شده باشد

### بررسی نصب Git:
```bash
git --version
```

### تنظیم Git (اگر هنوز تنظیم نکردید):
```bash
git config --global user.name "Omar Aghili"
git config --global user.email "o.a.exam8@gmail.com"
```

---

## 🎯 مرحله 1: ساخت Repository در GitHub

### روش آسان (از طریق وب):

1. **برید به GitHub:**
   - https://github.com

2. **روی + در گوشه راست بالا کلیک کنید**
   - New repository را انتخاب کنید

3. **تنظیمات Repository:**
   ```
   Repository name: oaexam8-lgtm.github.io
   Description: Personal Portfolio - A modern bilingual portfolio website
   Public ✅ (باید Public باشه برای GitHub Pages)
   ❌ Don't initialize with README (چون خودمون داریم)
   ❌ Don't add .gitignore (چون خودمون داریم)
   ❌ Don't add license (چون خودمون داریم)
   ```

4. **Create repository را بزنید**

---

## 🎯 مرحله 2: آپلود کردن پروژه

### روش 1: از طریق Terminal (توصیه می‌شود)

```bash
# 1. رفتن به پوشه پروژه
cd c:\Users\oaexa\Desktop\3

# 2. Initialize کردن Git
git init

# 3. اضافه کردن همه فایل‌ها
git add .

# 4. اولین Commit
git commit -m "🎉 Initial commit: Complete portfolio website"

# 5. نام branch رو به main تغییر بدید (اگر master هست)
git branch -M main

# 6. اضافه کردن Remote Repository
git remote add origin https://github.com/oaexam8-lgtm/oaexam8-lgtm.github.io.git

# 7. Push کردن
git push -u origin main
```

### روش 2: از طریق GitHub Desktop (آسان‌تر)

1. **GitHub Desktop رو باز کنید**
2. **File > Add Local Repository**
3. **پوشه پروژه رو انتخاب کنید**
4. **Publish repository**

---

## 🎯 مرحله 3: فعال‌سازی GitHub Pages

### مراحل:

1. **برید به Settings repository:**
   - https://github.com/oaexam8-lgtm/oaexam8-lgtm.github.io/settings

2. **از منوی سمت چپ Pages رو انتخاب کنید**

3. **تنظیمات زیر رو انجام بدید:**
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```

4. **Save را بزنید**

5. **صبر کنید 2-3 دقیقه**

6. **سایت شما آماده است:**
   - 🌐 https://oaexam8-lgtm.github.io

---

## 🎯 مرحله 4: بررسی نهایی

### چک‌لیست موفقیت:

- [ ] Repository در GitHub ساخته شد
- [ ] همه فایل‌ها آپلود شدند
- [ ] GitHub Pages فعال است
- [ ] سایت در آدرس https://oaexam8-lgtm.github.io باز می‌شود
- [ ] تمام لینک‌ها کار می‌کنند
- [ ] تصاویر نمایش داده می‌شوند
- [ ] تم تاریک/روشن کار می‌کند
- [ ] تغییر زبان کار می‌کند
- [ ] Responsive است (موبایل، تبلت، دسکتاپ)

---

## 🔄 آپدیت‌های بعدی

### وقتی می‌خواید تغییرات جدید اضافه کنید:

```bash
# 1. رفتن به پوشه پروژه
cd c:\Users\oaexa\Desktop\3

# 2. اضافه کردن تغییرات
git add .

# 3. Commit کردن با پیام مناسب
git commit -m "feat: افزودن ویژگی جدید"

# 4. Push کردن
git push
```

### انواع پیام‌های Commit:
```bash
feat: ویژگی جدید
fix: رفع باگ
docs: تغییر مستندات
style: تغییرات ظاهری CSS
refactor: بازنویسی کد
perf: بهبود عملکرد
```

---

## 🎨 سفارشی‌سازی بیشتر

### تغییر URL سایت:

اگر می‌خواید آدرس سایت رو تغییر بدید:

1. **Settings > Pages**
2. **Custom domain** بخش رو پیدا کنید
3. **دامنه خودتون رو وارد کنید** (نیاز به تنظیم DNS)

### افزودن Google Analytics:

در فایل `index.html` قبل از `</head>` اضافه کنید:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

---

## 🐛 مشکلات متداول

### مشکل 1: صفحه 404 می‌دهد
**راه‌حل:** صبر کنید 2-3 دقیقه. GitHub Pages زمان نیاز دارد.

### مشکل 2: تصاویر نمایش داده نمی‌شوند
**راه‌حل:** مسیرهای تصاویر را بررسی کنید. باید با `/` شروع شوند.

### مشکل 3: Git push کار نمی‌کند
**راه‌حل:** 
```bash
git remote -v  # بررسی remote
git remote set-url origin https://github.com/oaexam8-lgtm/oaexam8-lgtm.github.io.git
```

### مشکل 4: Authentication Error
**راه‌حل:** از Personal Access Token استفاده کنید به جای password:
- Settings > Developer settings > Personal access tokens
- Generate new token
- از token به جای password استفاده کنید

---

## 📱 اشتراک‌گذاری

### لینک‌های اشتراک‌گذاری:

**لینک مستقیم:**
```
https://oaexam8-lgtm.github.io
```

**GitHub Repository:**
```
https://github.com/oaexam8-lgtm/oaexam8-lgtm.github.io
```

**برای CV/رزومه:**
```
Portfolio: oaexam8-lgtm.github.io
GitHub: github.com/oaexam8-lgtm
```

---

## 🎉 تبریک!

پروژه شما الان live است و می‌تونید لینکش رو در رزومه، LinkedIn و هرجای دیگه استفاده کنید! 🚀

---

## 📧 نیاز به کمک؟

اگر مشکلی پیش اومد:
- 📧 Email: o.a.exam8@gmail.com
- 🐙 GitHub Issues: https://github.com/oaexam8-lgtm/oaexam8-lgtm.github.io/issues

---

**موفق باشید! 💪**
