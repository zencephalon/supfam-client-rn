#!/bin/bash
declare -a simulators=("DE5F6253-5F47-43B4-8640-63B3B9D84A4D" "43072570-735B-433A-A26B-A1D1D172105D" "12599A89-E8CC-4DE0-8D2E-F1D80C82D2E3")

for i in "${simulators[@]}"
do
    xcrun instruments -w $i -t $i
    #xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.15.3.app
    xcrun simctl openurl $i exp://127.0.0.1:19000      
done
