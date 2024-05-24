$(function() {
    $( "#switchButton" ).click(function() {
      $( "#switchButton" ).addClass( "onclic", 250, validate);
    });
  
    function validate() {
      setTimeout(function() {
        $( "#switchButton" ).removeClass( "onclic" );
        $( "#switchButton" ).addClass( "validate", 450, callback );
      }, 2250 );
    }
      function callback() {
        setTimeout(function() {
          $( "#switchButton" ).removeClass( "validate" );
        }, 1250 );
      }
    });
    document.getElementById('uploadButton').addEventListener('click', () => {
      const fileInput = document.getElementById('fileInput');
      const files = fileInput.files;
      
      if (files.length > 0) {
          const filesArray = [];
          
          Array.from(files).forEach(file => {
              const reader = new FileReader();
              reader.onload = function(event) {
                  const fileContent = event.target.result;
                  filesArray.push({
                      name: file.name,
                      content: fileContent
                  });
                  
                  if (filesArray.length === files.length) {
                      localStorage.setItem('gameFiles', JSON.stringify(filesArray));
                      alert('Файли завантажено і збережено в localStorage');
                  }
              };
              reader.readAsText(file);
          });
      } else {
          alert('Будь ласка, виберіть файли.');
      }
  });
  
  let isInitialContent = true;

        document.getElementById('switchButton').addEventListener('click', function() {
            const profileContainer = document.getElementById('profileContainer');
            profileContainer.innerHTML = isInitialContent ? newContent : initialContent;
            isInitialContent = !isInitialContent;
        });

       


    document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    
    if (files.length > 0) {
        const filesArray = [];
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const fileContent = event.target.result;
                filesArray.push({
                    name: file.name,
                    content: fileContent
                });
                
                if (filesArray.length === files.length) {
                    localStorage.setItem('gameFiles', JSON.stringify(filesArray));
                    alert('Файли завантажено і збережено в localStorage');
                }
            };
            reader.readAsText(file);
        });
    } else {
        alert('Будь ласка, виберіть файли.');
    }
}); 
  