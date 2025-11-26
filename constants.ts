import { GalleryImage } from './types';

/**
 * 主页面背景图片URL
 * 用途：作为 landing 页面（着陆页/首页）的背景图
 * 说明：已更新为指向项目根目录下 ground 文件夹中的图片
 */
export const LANDING_BG_URL = "/ground/dream-generated-1763883401907.png";

/**
 * 画廊页面背景图片URL
 * 用途：作为画廊页面的背景图
 * 说明：当前使用picsum的占位图，已按要求设置尺寸为1080x1620并添加模糊效果
 */
export const GALLERY_BG_URL = "https://picsum.photos/id/1042/1080/1620?blur=2";
/**
 * 画廊背景音乐URL
 * 用途：画廊页面播放的背景音乐
 * 说明：已更新为指向项目根目录下 ground 文件夹中的音频文件
 */
export const GALLERY_MUSIC_URL = "/ground/audio.mp3";

/**
 * 画廊的10张图片数据数组
 * 类型：GalleryImage[] - 符合GalleryImage接口定义的数组
 * 说明：所有图片已按要求设置尺寸为1280x1920，路径指向项目根目录下的photo文件夹
 */
export const GALLERY_IMAGES: GalleryImage[] = [
    {
        id: '1',
        url: "/photo/7be8515f1cba396241381868f0863a7e.png",
        title: '深情黄子',
        description: '沉浸在音乐世界里的黄子，每一个音符都是他的心跳。'
    },
    {
        id: '2',
        url: "/photo/0c98be38438f900234070a09bf5cfddb.jpg",
        title: '唯美黄子',
        description: '白纱下的黄子，如梦似幻，纯净而美好。'
    },
    {
        id: '3',
        url: "/photo/4bc956709e4b2ad97f953e4e8f2fb977.jpg",
        title: '闪耀黄子',
        description: '舞台上的黄子，比星光更加璀璨夺目。'
    },
    {
        id: '4',
        url:"/photo/f0cd9b092393244c3cb6a38ba9bd818c.jpg",
        title: '谢幕黄子',
        description: '黄子用歌声诉说着故事，感动了在场的每一个人。'
    },
    {
        id: '5',
        url:"/photo/29e7726666172929a6c69da215bf2e96.jpg",
        title: '天使黄子',
        description: '仿佛落入凡间的天使，黄子散发着温柔的光芒。'
    },
    {
        id: '6',
        url: "/photo/5e0d432f9b3429874daa93d502a03201.jpg",
        title: '魅力黄子',
        description: '举手投足间，黄子释放着无限的舞台魅力。'
    },
    {
        id: '7',
        url: "/photo/083bd09d08f13e98dd2c1c5727a4ed6c.jpg",
        title: '梦幻黄子',
        description: '流动的光影中，黄子是那个最不真实的梦。'
    },
    {
        id: '8',
        url: "/photo/1167f296a8209343d5f32d35a8818b47.png",
        title: '可爱黄子',
        description: '被玩偶环绕的黄子，充满了童真与快乐。'
    },
    {
        id: '9',
        url: "/photo/a02529e4298dde44954f88e5edc4fb93.jpg",
        title: '黄子黄子',
        description: '黄子的帅气。'
    },
    {
        id: '10',
        url:  "/photo/b847193b65cf81ae969ed593e5d3b1f4.jpg",
        title: '谢幕黄子',
        description: '完美的演出，属于黄子和我们的珍贵回忆。'
    },
];