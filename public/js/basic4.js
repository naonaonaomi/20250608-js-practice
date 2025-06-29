
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn1').addEventListener('click', function() {
        const result = document.getElementById('result1');
        result.innerHTML = '';
        
        try {
            function add(a, b) {
                return a + b;
            }
            
            const test1 = add(2, 3) === 5 ? "成功" : "失敗";
            const test2 = add(0, 0) === 0 ? "成功" : "失敗";
            
            result.innerHTML += `<p>テスト1: ${test1}</p>`;
            result.innerHTML += `<p>テスト2: ${test2}</p>`;
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });

    document.getElementById('btn2').addEventListener('click', function() {
        const result = document.getElementById('result2');
        result.innerHTML = '';
        
        try {
            function calculate(x, y) {
                result.innerHTML += `<p>入力値: ${x}, ${y}</p>`;
                let calcResult = x * y + 10;
                result.innerHTML += `<p>計算結果: ${calcResult}</p>`;
                return calcResult;
            }
            
            calculate(5, 3);
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });

    document.getElementById('btn3').addEventListener('click', function() {
        const result = document.getElementById('result3');
        result.innerHTML = '';
        
        try {
            let calcResult = 10 / 0;
            result.innerHTML += `<p>結果: ${calcResult}</p>`;
        } catch (error) {
            result.innerHTML += `<p>エラーが発生しました</p>`;
        }
    });

    document.getElementById('btn4').addEventListener('click', function() {
        const result = document.getElementById('result4');
        result.innerHTML = '';
        
        try {
            const startTime = performance.now();
            let sum = 0;
            for (let i = 0; i < 1000; i++) {
                sum += i;
            }
            const endTime = performance.now();
            
            result.innerHTML += `<p>実行時間: ${(endTime - startTime).toFixed(2)}ms</p>`;
            result.innerHTML += `<p>合計: ${sum}</p>`;
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });
});
