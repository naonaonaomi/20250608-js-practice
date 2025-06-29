
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn1').addEventListener('click', function() {
        const result = document.getElementById('result1');
        result.innerHTML = '';
        
        try {
            function sanitizeInput(input) {
                return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
            
            const userInput = "&lt;script&gt;alert('悪意のあるコード')&lt;/script&gt;";
            const safe = sanitizeInput(userInput);
            result.innerHTML += `<p>安全な文字列: ${safe}</p>`;
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });

    document.getElementById('btn2').addEventListener('click', function() {
        const result = document.getElementById('result2');
        result.innerHTML = '';
        
        try {
            function validateEmail(email) {
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return pattern.test(email);
            }
            
            result.innerHTML += `<p>有効: ${validateEmail("test@example.com")}</p>`;
            result.innerHTML += `<p>無効: ${validateEmail("invalid-email")}</p>`;
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });

    document.getElementById('btn3').addEventListener('click', function() {
        const result = document.getElementById('result3');
        result.innerHTML = '';
        
        try {
            const startTime = performance.now();
            let sum = 0;
            for (let i = 0; i < 1000; i++) {
                sum += i;
            }
            const endTime = performance.now();
            
            result.innerHTML += `<p>処理時間: ${(endTime - startTime).toFixed(2)}ms</p>`;
            result.innerHTML += `<p>合計: ${sum}</p>`;
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });
});
