import axios from 'axios'
import asyncHandler from './async_handler'
import { getPlatform, isWebApp, isMobileApp, isIOSApp, isAndroidApp } from 'cozy-device-helper'

export const getDeviceInfo = asyncHandler(async() => {
    let result = await axios.get('https://api.ipify.org?format=json')
    return {
        ip: result.data.ip,
        device: {
            platform: getPlatform(),
            isWebApp: isWebApp(),
            isMobileApp: isMobileApp(),
            isAndroidApp: isAndroidApp(),
            isIOSApp: isIOSApp()
        }
    }

})