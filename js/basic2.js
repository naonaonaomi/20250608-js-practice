// 1. DOM取得
const btnDomGet = document.getElementById('btn-dom-get');
if(btnDomGet) {
  btnDomGet.addEventListener('click', () => {
    const el = document.getElementById('sample');
    const el2 = document.querySelector('.sample-class');
    document.getElementById('result-dom-get').textContent = `getElementById: ${el.textContent}, querySelector: ${el2.textContent}`;
  });
}

// 2. イベントリスナー
const btnEvent = document.getElementById('btn-event');
if(btnEvent) {
  btnEvent.addEventListener('click', () => {
    document.getElementById('result-event').textContent = 'クリックイベントが発動しました！';
  });
}

// 3. フォームの入力取得
const form = document.getElementById('sample-form');
if(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = document.getElementById('input-text').value;
    document.getElementById('result-form').textContent = `入力値: ${value}`;
  });
}

// 4. クラスの操作
const classTarget = document.getElementById('class-target');
if(classTarget) {
  document.getElementById('btn-add').onclick = () => {
    classTarget.classList.add('active');
    document.getElementById('result-classlist').textContent = 'activeクラスを追加しました';
  };
  document.getElementById('btn-remove').onclick = () => {
    classTarget.classList.remove('active');
    document.getElementById('result-classlist').textContent = 'activeクラスを削除しました';
  };
  document.getElementById('btn-toggle').onclick = () => {
    classTarget.classList.toggle('active');
    document.getElementById('result-classlist').textContent = 'activeクラスをトグルしました';
  };
}

// 5. スタイル変更
const btnStyle = document.getElementById('btn-style');
const styleTarget = document.getElementById('style-target');
if(btnStyle && styleTarget) {
  btnStyle.onclick = () => {
    styleTarget.style.color = 'red';
    styleTarget.style.backgroundColor = 'yellow';
    document.getElementById('result-style').textContent = '色と背景色を変更しました';
  };
}

// 6. ノードの追加・削除
const btnAddNode = document.getElementById('btn-add-node');
const btnRemoveNode = document.getElementById('btn-remove-node');
const nodeArea = document.getElementById('node-area');
let addedNode = null;
if(btnAddNode && nodeArea) {
  btnAddNode.onclick = () => {
    if(!addedNode) {
      addedNode = document.createElement('div');
      addedNode.textContent = '追加されたノード';
      nodeArea.appendChild(addedNode);
      document.getElementById('result-node').textContent = 'ノードを追加しました';
    }
  };
}
if(btnRemoveNode && nodeArea) {
  btnRemoveNode.onclick = () => {
    if(addedNode && nodeArea.contains(addedNode)) {
      nodeArea.removeChild(addedNode);
      document.getElementById('result-node').textContent = 'ノードを削除しました';
      addedNode = null;
    }
  };
}

// 7. クラスとインスタンス
const btnClass = document.getElementById('btn-class');
if(btnClass) {
  btnClass.onclick = () => {
    class Animal {
      constructor(name) {
        this.name = name;
      }
      greet() {
        return `こんにちは、${this.name}です`;
      }
    }
    const dog = new Animal('ポチ');
    document.getElementById('result-class').textContent = dog.greet();
  };
} 