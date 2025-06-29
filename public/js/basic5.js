
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn1').addEventListener('click', function() {
        const result = document.getElementById('result1');
        result.innerHTML = '<p>処理中...</p>';
        
        try {
            const promise = new Promise((resolve) => {
                setTimeout(() => resolve("完了！"), 1000);
            });
            
            promise.then(promiseResult => {
                result.innerHTML = `<p>${promiseResult}</p>`;
            });
        } catch (error) {
            result.innerHTML = `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });

    document.getElementById('btn2').addEventListener('click', function() {
        const result = document.getElementById('result2');
        result.innerHTML = '';
        
        try {
            async function fetchData() {
                result.innerHTML += '<p>データ取得開始</p>';
                await new Promise(resolve => setTimeout(resolve, 500));
                result.innerHTML += '<p>データ取得完了</p>';
            }
            
            fetchData();
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });

    document.getElementById('btn3').addEventListener('click', function() {
        const result = document.getElementById('result3');
        result.innerHTML = '';
        
        try {
            function counter() {
                let count = 0;
                return function() {
                    count++;
                    return count;
                };
            }
            
            const myCounter = counter();
            result.innerHTML += `<p>1回目: ${myCounter()}</p>`;
            result.innerHTML += `<p>2回目: ${myCounter()}</p>`;
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });

    document.getElementById('btn4').addEventListener('click', function() {
        const result = document.getElementById('result4');
        result.innerHTML = '';
        
        try {
            function Animal(name) {
                this.name = name;
            }
            
            Animal.prototype.speak = function() {
                return `${this.name}が鳴いています`;
            };
            
            const dog = new Animal("ポチ");
            result.innerHTML += `<p>${dog.speak()}</p>`;
        } catch (error) {
            result.innerHTML += `<p style="color: red;">エラー: ${error.message}</p>`;
        }
    });
});
