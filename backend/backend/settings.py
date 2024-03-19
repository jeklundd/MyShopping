from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = 'django-insecure-5c&wpnm-%+wk87(0ea_pe2%h@qmm@&ohqu)r&5n+kg+21dh2x&'

DEBUG = True

ALLOWED_HOSTS = ['10.0.2.2', 'localhost', '127.0.0.1']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
     'rest_auth',
    'rest_auth.registration',
    'shoppinglist',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_AUTH_SERIALIZERS = {'USER_DETAILS_SERIALIZER':'shoppinglist.serializers.UserSerializer' }

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000'
    '10.0.2.2'
]

AUTH_USER_MODEL = 'shoppinglist.CustomUser'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
"allauth.account.auth_backends.AuthenticationBackend"
)

SITE_ID = 1
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_UNIQUE_EMAIL = True

REST_FRAMEWORK = {
'DATETIME_FORMAT': "%m/%d/%Y %I:%M%P",
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
],
}

