(function() {
  // DOM取得ユーティリティ
  const $ = (id) => document.getElementById(id);

  // 1. DOM取得
  const btnDomGet = $('btn-dom-get');
  if(btnDomGet) {
    btnDomGet.addEventListener('click', () => {
      const el = $('sample');
      const el2 = document.querySelector('.sample-class');
      $('result-dom-get').textContent = `getElementById: ${el.textContent}, querySelector: ${el2.textContent}`;
    });
  }

  // 2. イベントリスナー
  const btnEvent = $('btn-event');
  if(btnEvent) {
    btnEvent.addEventListener('click', () => {
      $('result-event').textContent = 'クリックイベントが発動しました！';
    });
  }

  // 3. フォームの入力取得
  const form = $('sample-form');
  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const value = $('input-text').value;
      $('result-form').textContent = `入力値: ${value}`;
    });
  }

  // 4. クラスの操作
  const classTarget = $('class-target');
  if(classTarget) {
    const btnAdd = $('btn-add');
    const btnRemove = $('btn-remove');
    const btnToggle = $('btn-toggle');
    const resultClass = $('result-classlist');
    if(btnAdd) btnAdd.onclick = () => {
      classTarget.classList.add('active');
      resultClass.textContent = 'activeクラスを追加しました';
    };
    if(btnRemove) btnRemove.onclick = () => {
      classTarget.classList.remove('active');
      resultClass.textContent = 'activeクラスを削除しました';
    };
    if(btnToggle) btnToggle.onclick = () => {
      classTarget.classList.toggle('active');
      resultClass.textContent = 'activeクラスをトグルしました';
    };
  }

  // 5. スタイル変更
  const btnStyle = $('btn-style');
  const styleTarget = $('style-target');
  if(btnStyle && styleTarget) {
    btnStyle.onclick = () => {
      styleTarget.style.color = 'red';
      styleTarget.style.backgroundColor = 'yellow';
      $('result-style').textContent = '色と背景色を変更しました';
    };
  }

  // 6. ノードの追加・削除
  const btnAddNode = $('btn-add-node');
  const btnRemoveNode = $('btn-remove-node');
  const nodeArea = $('node-area');
  let addedNode = null;
  if(btnAddNode && nodeArea) {
    btnAddNode.onclick = () => {
      if(!addedNode) {
        addedNode = document.createElement('div');
        addedNode.textContent = '追加されたノード';
        nodeArea.appendChild(addedNode);
        $('result-node').textContent = 'ノードを追加しました';
      }
    };
  }
  if(btnRemoveNode && nodeArea) {
    btnRemoveNode.onclick = () => {
      if(addedNode && nodeArea.contains(addedNode)) {
        nodeArea.removeChild(addedNode);
        $('result-node').textContent = 'ノードを削除しました';
        addedNode = null;
      }
    };
  }

  // 7. クラスとインスタンス
  const btnClass = $('btn-class');
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
      $('result-class').textContent = dog.greet();
    };
  }
})(); 