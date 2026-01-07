<script>
    // 1. 打字機特效設定
    const textToType = "生產一組"; // 這裡修改標題文字
    const typeSpeed = 150;        // 打字速度 (毫秒)
    const element = document.getElementById('typewriter-text');
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            element.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        }
    }

    // 頁面載入後開始打字
    window.addEventListener('load', typeWriter);

    // 2. 智慧分頁標題 (離開分頁時改變標題)
    const originalTitle = document.title;
    const awayTitle = "( ˘•ω•˘ ) 等你回來..."; // 離開時的標題

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = awayTitle;
        } else {
            document.title = originalTitle;
        }
    });
</script>
