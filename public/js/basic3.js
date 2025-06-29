document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('btn1').addEventListener('click', function() {
        try {
            let element1 = document.getElementById('sample') || document.createElement('div');
            let element2 = document.querySelector('.sample-class') || document.createElement('div');
            let element3 = document.querySelectorAll('div');
            
            document.getElementById('result1').innerHTML = 
                `ID: ${element1.tagName || 'null'}<br>` +
                `クラス: ${element2.tagName || 'null'}<br>` +
                `div要素数: ${element3.length}個`;
        } catch (error) {
            document.getElementById('result1').innerHTML = `エラー: ${error.message}`;
        }
    });
    
    document.getElementById('btn2').addEventListener('click', function() {
        try {
            document.getElementById('result2').innerHTML = 
                `クリックされました!<br>時刻: ${new Date().toLocaleTimeString()}`;
        } catch (error) {
            document.getElementById('result2').innerHTML = `エラー: ${error.message}`;
        }
    });
    
    document.getElementById('btn3').addEventListener('click', function() {
        try {
            let form = document.getElementById('sample-form');
            if (!form) {
                form = document.createElement('form');
                form.id = 'sample-form';
                let input = document.createElement('input');
                input.id = 'input-text';
                input.value = 'サンプル入力値';
                form.appendChild(input);
                document.body.appendChild(form);
            }
            
            let input = document.getElementById('input-text');
            let value = input ? input.value : 'デモ値';
            
            document.getElementById('result3').innerHTML = `入力値: ${value}`;
        } catch (error) {
            document.getElementById('result3').innerHTML = `エラー: ${error.message}`;
        }
    });
    
});   