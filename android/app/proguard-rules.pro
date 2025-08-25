# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Add any project specific keep options here:
# WebRTC ProGuard Rules - CRITICAL for release builds
-keep class com.oney.WebRTCModule.** { *; }
-keep class org.webrtc.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keepclassmembers class org.webrtc.** { *; }
-keepclassmembers class com.oney.WebRTCModule.** { *; }

# Keep WebRTC native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep WebRTC JNI
-keep class * extends org.webrtc.** { *; }

# Socket.io client
-keep class io.socket.** { *; }
-keep class com.github.nkzawa.** { *; }