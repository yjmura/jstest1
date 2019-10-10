  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('text/plain')) {
        continue;
      }

      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');

      var reader = new FileReader();

      // エラー発生時の処理
      reader.onerror = function (evt) {
          disp.innerHTML = "読み取り時にエラーが発生しました。";
      }

      // ファイル読取が完了した際に呼ばれる処理
      reader.onload = function (evt) {
          // FileReaderが取得したテキストをそのままdivタグに出力
          DRMRead(reader.result);
          // disp.innerHTML = reader.result.replace(/(\n|\r)/g, '<br />');
          DrawBasicLine();

      }
      // readAsTextメソッドでファイルの内容を取得
      reader.readAsText(f, 'shift-jis');
    }

    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    // ブラウザ上でファイルを展開する挙動を抑止
　　event.preventDefault();
  }
  
  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  function onDragOver(event) { 
    // ブラウザ上でファイルを展開する挙動を抑止
    event.preventDefault(); 
  }


