jQuery(function($) {
  var i=0;
  var submitrulenumber=0;
  var computelogicnumber=0;
  var scopecomputelogicnumber=0;
  var rulenumber=[];
  var rulenumbercnt=0;
  rulenumber[0]=[];
  var conditionArray = [];
  var firstHalf = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>{{FormHeading}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <style>
  
  @media (min-width:1000px) and (max-width: 5000px) {
    .main-div {width:80%; margin-bottom:15px; margin-left:auto; margin-right:auto; display:inline-block; text-align:left;}
    .main-div h2 {color: #0099FF; font-weight: 600; margin: 0; font-size:16px; text-align:left; font-family: "Open Sans", sans-serif;}
    .left-div { width:25%; margin-bottom:15px; float:left; height:40px;}
    .left-div1 { width:73%; margin-bottom:15px; float:left; height:40px;}
    .left-div h2 { color: #393939; font-weight: 600; margin: 0; font-size:13px; text-align:left; font-family: "Open Sans", sans-serif;}
    .in-with { width:90%; height:26px}
    .in-with1 { width:92%; height: 32px;}
    .div-three { width:33%; float:left;}
    }
  
    @media (min-width: 700px) and (max-width: 999px) {
      .main-div {width:95%; margin-bottom:10px; display:inline-block;}
      .main-div h2 {color: #0099FF; font-weight: 600; margin: 0; font-size:16px; text-align:left; font-family: "Open Sans", sans-serif;}
      .left-div { width:25%; float:left;  height:40px;}
      .left-div1 { width:73%; margin-bottom:15px; float:left; height:40px;}
      .left-div h2 { color: #393939; font-weight: 600; margin: 0; font-size:16px; font-family: "Open Sans", sans-serif;}
      .in-with { width:90%;}
      .in-with1 { width:92%; height: 25px;}
      .div-three { width:32%; float:left;}
      }
  
      @media (min-width: 70px) and (max-width: 699px) {
        .hide1 { display:none !important; visibility:hidden !important;}
        .main-div {width:90%; margin-bottom:10px; display:inline-block;}
        .main-div h2 { color: #0099FF; font-weight: 600; margin: 0; font-size:16px; font-family: "Open Sans", sans-serif;}
        .left-div { width:100%; float:left; margin-bottom:10px; vertical-align:middle; font-size:12px; text-align:left;}
  .left-div1 { width:95%; float:left; margin-bottom:10px; vertical-align:middle; font-size:12px; text-align:left;}
  .in-with { width:95%;  height: 25px;}
  .in-with1 { width:97%; height: 28px;}
  }
  select option {width:300px; font-size: 12px; word-wrap: break-word;}
  b {color:grey;}
  img {
    display: block;
    margin: 0 auto;
}
  </style>
  </head>
  <body style="font-family: 'Open Sans', sans-serif; background-image:none;">
  
  <div style="margin:auto; text-align:center;">
    <div id="mainFormHolder" class="main-div" style="border:1px solid #ccc; border-radius: 13px; padding:10px;">
    
    `;
    var secondHalf=
    `</div>
    </div>
    </body>
    </html>`;

  var validationScriptString = `
  function IsEmpty(val)
  {
    if(!val || val=='') return true;
    else return false;
  }
  function IsAlphabet(val)
  {
    if(IsEmpty(val)) return false;
    
    var letters = /^[A-Za-z]+$/;
    if(val.match(letters)) return true;
    else return false;
  }
  function IsNumeric(val)
  {
    if(IsEmpty(val)) return false;
    
    if(isNaN(val)) return false;
    else return true;
  }
  function IsAlphaNumeric(val)
  {
    if(IsEmpty(val)) return false;
    
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if(val.match(letterNumber)) return true;
    else return false;
  }
  function IsValidEMail(val) 
  {
    if(IsEmpty(val)) return false;
    
    var atpos = val.indexOf("@");
    var dotpos = val.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }
    else{
      return true;
    }
      
  }
  function IsValidPhone(str) 
  {
    if(IsEmpty(str)) return false;
    if(IsAlphabet(str)) return false;
    str = str.replace(/[^a-zA-Z0-9]/g, '');
    if(IsNumeric(str)) return true;
    return false;
  }
  function IsValidURL(string)
  {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }
  `;
  addRule();

  var fields = [
    

  ];

  var replaceFields = [
    // {
    //   type: 'text',
    //   subtype: 'time',
    //   label: 'Time',
    //   required: true,
    // }
  ];

  var actionButtons = [{
    id: 'smile',
    className: 'btn btn-success',
    label: '😁',
    type: 'button',
    events: {
      click: function() {
        alert('😁😁😁 !SMILE! 😁😁😁');
      }
    }
  }];

  var templates = {
    starRating: function(fieldData) {
      return {
        field: '<span id="'+fieldData.name+'">',
        onRender: function() {
          $(document.getElementById(fieldData.name)).rateYo({rating: 3.6});
        }
      };
    }
  };

  var inputSets = [{
        label: 'Time',
        icon: '&#x1F550;',
        name: 'time', // optional
        showHeader: false, // optional
        fields: [{
          type: 'text',subtype:"time",
          label: 'Time',
          className: 'form-control'
        }]
      },
      {
        label: 'Currency',
        icon: '&#x1F4B5;',
        name: 'currency', // optional
        className:'row',
        showHeader: false, // optional
        fields: [{
          type: 'number',subtype:"number",
          label: 'Amount',
          className: 'form-control col-sm-10'
        }]
      }];

  var typeUserDisabledAttrs = {
    autocomplete: ['access']
  };

  var typeUserAttrs = {
    text: {
      className: {
        label: 'Class',
        options: {
          'red form-control': 'Red',
          'green form-control': 'Green',
          'blue form-control': 'Blue'
        },
        style: 'border: 1px solid red'
      }
    }
  };

  // test disabledAttrs
  var disabledAttrs = ['placeholder'];

  var fbOptions = {
    subtypes: {
      text: ['time']
    },
    onSave: function(e, formData) {
      //toggleEdit();
      document.getElementsByClassName("render-wrap")[0].style.display="block";
      // document.body.classList.toggle('form-rendered', false);
      $('.render-wrap').formRender({
        formData: formData,
        templates: templates
      });
      renderJS();
      
      window.sessionStorage.setItem('formData', JSON.stringify(formData));
    },
    stickyControls: {
      enable: true
    },
    sortableControls: true,
    fields: fields,
    templates: templates,
    inputSets: inputSets,
    typeUserDisabledAttrs: typeUserDisabledAttrs,
    typeUserAttrs: typeUserAttrs,
    disableInjectedStyle: false,
    // actionButtons: actionButtons,
    disableFields: ['autocomplete'],
    replaceFields: replaceFields,
    disabledFieldButtons: {
      text: ['copy']
    }
    // controlPosition: 'left'
    // disabledAttrs
  };
  var formData = window.sessionStorage.getItem('formData');
  var editing = true;

  if (formData) {
    fbOptions.formData = JSON.parse(formData);
  }

  /**
   * Toggles the edit mode for the demo
   * @return {Boolean} editMode
   */
  function toggleEdit() {
    document.body.classList.toggle('form-rendered', editing);
    var a = document.getElementById("a");
    a.style.display="none";
    if(!editing){
      document.getElementById("viewHTMLButton").style.display="none";
      document.getElementById("conditionDivMain").style.display="block";
    }
    else{
      document.getElementById("viewHTMLButton").style.display="block";
      document.getElementById("conditionDivMain").style.display="none";
    }
    return editing = !editing;
  }

  var setFormData = '[{"type":"text","label":"Full Name","subtype":"text","className":"form-control","name":"text-1476748004559"},{"type":"select","label":"Occupation","className":"form-control","name":"select-1476748006618","values":[{"label":"Street Sweeper","value":"option-1","selected":true},{"label":"Moth Man","value":"option-2"},{"label":"Chemist","value":"option-3"}]},{"type":"textarea","label":"Short Bio","rows":"5","className":"form-control","name":"textarea-1476748007461"}]';

  var formBuilder = $('.build-wrap').formBuilder(fbOptions);
  var fbPromise = formBuilder.promise;
  document.addEventListener('fieldAdded', function(){
    //alert(formBuilder.formData) ;
    setTimeout(function(){
      updateFieldDropdowns();
      $('.render-wrap').formRender({
        formData: formBuilder.formData,
        templates: templates
      });
      renderJS();
      },100);
  });
  
 
  document.addEventListener('fieldRemoved', function(){
    setTimeout(function(){
    updateFieldDropdowns();
    $('.render-wrap').formRender({
      formData: formBuilder.formData,
      templates: templates
    });
    renderJS();
    },500);
  });
  
  [].forEach.call
  (
    document.getElementsByClassName("refresharea"),
    function(sel){
      sel.addEventListener("click",function(e){
        $('.render-wrap').formRender({
          formData: formBuilder.formData,
          templates: templates
        });
        renderJS();
      })
    }
  );
  [].forEach.call
  (
    document.getElementsByClassName("refreshrules"),
    function(sel){
      sel.addEventListener("click",function(e){
        updateFieldDropdowns();
        
      })
    }
  );

  function updateFieldDropdowns()
  {
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    var lclCnt=0;
    for(lclCnt=0;lclCnt<=rulenumbercnt;lclCnt++){
      
      
      //$("#wantToFields"+lclCnt).empty();
      var wantToField = $("#wantToFields"+lclCnt);
      //wantToField.empty();
      dropdownOptionsGenerator(frmData,wantToField,"update");
      
    }
    for(lclCnt=0;lclCnt<=computelogicnumber;lclCnt++){
      
      var computelogicvalueof = $("#computelogicvalueof"+lclCnt);
      //computelogicvalueof.empty();
      dropdownOptionsGenerator(frmData,computelogicvalueof,"update");

      var fromvalueof = $("#fromvalueof"+lclCnt);
      //fromvalueof.empty();
      dropdownOptionsGenerator(frmData,fromvalueof,"update");

      var inputVal = $("#inputval"+lclCnt);
      
      dropdownOptionsGenerator(frmData,inputVal,"update");
      
    }
    
    
    // $("#submitButtonList").empty();
    // var submitButtonLst1=document.getElementById("submitButtonList");
    // dropdownOptionsGenerator(frmData,submitButtonLst1);
    var ct=0;
    for(ct=0;ct<=submitrulenumber;ct++){
      
      
      var subconlist=$("#submitConditionInputList"+ct);
      dropdownOptionsGenerator(frmData,subconlist,"update");
    }

    
  }

  fbPromise.then(function(fb) {
    document.getElementsByClassName("render-wrap")[0].style.display="block";
    var apiBtns = {
      // showData: fb.actions.showData,
      
     
      // addField: function() {
      //   var field = {
      //       type: 'text',
      //       class: 'form-control',
      //       label: 'Text Field added at: ' + new Date().getTime()
      //     };
      //   fb.actions.addField(field);
      // },
      // removeField: function() {
      //   fb.actions.removeField();
      // },
      // testSubmit: function() {
      //   var formData = new FormData(document.forms[0]);
      //   console.log('Can submit: ', document.forms[0].checkValidity());
      //   // Display the key/value pairs
      //   console.log('FormData:', formData);
      //   for(var pair of formData.entries()) {
      //      console.log(pair[0]+ ': '+ pair[1]);
      //   }
      // },
      // resetDemo: function() {
      //   window.sessionStorage.removeItem('formData');
      //   location.reload();
      // }
    };
    Object.keys(apiBtns).forEach(function(action) {
      document.getElementById(action)
      .addEventListener('click', function(e) {
        apiBtns[action]();
      });
    });

    // document.getElementById('setLanguage')
    // .addEventListener('change', function(e) {
    //   fb.actions.setLang(e.target.value);
    // });

    // document.getElementById('getXML').addEventListener('click', function() {
    //   alert(formBuilder.actions.getData('xml'));
    // });
    // document.getElementById('getJSON').addEventListener('click', function() {
    //   alert(formBuilder.actions.getData('json', true));
    // });
    
    
    document.getElementById('getJS').addEventListener('click', function() {
      var js=document.createElement("script");
      js.id="jsScript";
      var str="";
      for(var k in rulenumber)
      {
        var iWantTo=document.getElementById("iWantTo"+k);
        if(iWantTo){
          var val = iWantTo.options[iWantTo.selectedIndex].value

          var conditionSelect=document.getElementById("conditionSelect"+k);
          var conditionSelectValue = conditionSelect.options[conditionSelect.selectedIndex].value
          str += checkAgainst(val,conditionSelectValue,k);
        }
        
        
      }

      js.innerHTML="(function(){"+str+"})()";
      try{
        var item = document.getElementById("jsScript");
        item.parentNode.removeChild(item);
      }
      catch(e){

      }
      document.getElementById("render-wrap").appendChild(js);
      var str=document.getElementById("render-wrap").outerHTML;
      download(str);
    });
  });

  document.getElementById('edit-form').onclick = function() {
    toggleEdit();
  };
  
  // document.getElementById('addRule').onclick=function(){
    
  // }
  document.getElementById('addNewrule').onclick=function(){
    rulenumbercnt=rulenumbercnt+1;
    addRule();
  }
  function addRule(){
    
    ruleCreator();
    
    $('.selectcustom').select2();
    rulenumber[rulenumbercnt]=[];
    
  }
  
  function dropdownOptionsGenerator(frmData,optionField,calledFrom)
  {
    var id="";
    var vals=[];
    if(!optionField) return;
      if(calledFrom=="update"){
      var id = optionField.attr("id");
      $("#"+id+" :selected").each(function(){
        vals.push($(this).val()); 
      });
      optionField.empty();
    }
    
    frmData.forEach(function(elmt){
      if(elmt.name){
        var opt = document.createElement('option');
        opt.value = elmt.name;
        opt.innerHTML = elmt.name;
        optionField.append(opt);
      }
    });
    if(calledFrom=="update"){
      $("#"+id).val(vals);
    }
    //optionField.value=temp_data;
  }
  function equalsOptionGenerator(optionField)
  {
    var arr=['Equals','Not Equals','Contains'];
    arr.forEach(function(elmt){
      
      var opt = document.createElement('option');
      opt.value = elmt;
      opt.innerHTML = elmt;
      optionField.appendChild(opt);
    });
  }
  function ruleCreator()
  {
    var parentDiv=document.getElementById("rulediv");
    var borderDiv = document.createElement("div");

    borderDiv.id="borderDiv"+rulenumbercnt;
    borderDiv.style.borderStyle="solid";
    borderDiv.style.borderRadius="5px";
    
    var div1=document.createElement("div");
    div1.style.margin="10px";

    var wantTolabel = document.createElement("label");
    wantTolabel.innerHTML="I want to";
    wantTolabel.style.paddingRight="10px";

    var wantedsSelect = document.createElement("select");
    wantedsSelect.innerHTML="<option>Show</option><option>Hide</option><option>Disable</option><option>Enable</option>";
    wantedsSelect.className="selectcustom";
    wantedsSelect.id="iWantTo"+rulenumbercnt;
    wantedsSelect.name="iWantTo"+rulenumbercnt;
    wantedsSelect.style.width="10%";

    var fieldsLabel = document.createElement("label");
    fieldsLabel.innerHTML="Field(s)";
    fieldsLabel.style.paddingRight="10px";
    fieldsLabel.style.paddingLeft="10px";

    var wantToFields =document.createElement("select");
    wantToFields.className="selectcustom";
    wantToFields.id="wantToFields"+rulenumbercnt;
    wantToFields.name="wantToFields"+rulenumbercnt;
    wantToFields.multiple="multiple";
    wantToFields.style.width="60%";
    wantToFields.style.paddingRight="10px";
    if(formBuilder){
      var frmData=JSON.parse(formBuilder.actions.getData('json', true));
      dropdownOptionsGenerator(frmData,wantToFields,"new");
    }

    div1.appendChild(wantTolabel);
    div1.appendChild(wantedsSelect);
    div1.appendChild(fieldsLabel);
    div1.appendChild(wantToFields);

    var div2 = document.createElement("div");
    div2.style.margin="10px";

    var ifLabel = document.createElement("label");
    ifLabel.innerHTML="If";
    ifLabel.style.paddingRight="10px";

    var wantedsIfSelect = document.createElement("select");
    wantedsIfSelect.innerHTML="<option>All</option><option>None</option><option>Any</option>";
    wantedsIfSelect.className="selectcustom";
    wantedsIfSelect.id="conditionSelect"+rulenumbercnt;
    wantedsIfSelect.name="conditionSelect"+rulenumbercnt;
    wantedsIfSelect.style.width="10%";
  

    var ifRuleLabel = document.createElement("label");
    ifRuleLabel.innerHTML="of following rules matches";
    ifRuleLabel.style.paddingLeft="10px";

    div2.appendChild(ifLabel);
    div2.appendChild(wantedsIfSelect);
    div2.appendChild(ifRuleLabel);

    var div3=document.createElement("div");
    div3.id="conditiondiv"+rulenumbercnt;
    div3.style.margin="10px";

    var addLink=document.createElement("a");
    addLink.innerHTML="add new condition";
    addLink.id="addConditionDiv"+rulenumbercnt;
    addLink.className="add add-opt";
    addLink.style.margin="10px";

    borderDiv.appendChild(div1);
    borderDiv.appendChild(div2);
    borderDiv.appendChild(div3);
    borderDiv.appendChild(addLink);
    parentDiv.appendChild(borderDiv);
    document.getElementById('iWantTo'+rulenumbercnt).onchange = function() {
      //alert(formBuilder.actions.getData('json', true));
      var cnt=this.id.match(/\d+$/)[0];
      $("#wantToFields"+cnt).empty();
      var frmData=JSON.parse(formBuilder.actions.getData('json', true));
      var wantToField = document.getElementById("wantToFields"+cnt);
      dropdownOptionsGenerator(frmData,wantToField,"new");
      
      
    };

    addLink.onclick = function()
    {
      
      var cnt=this.id.match(/\d+$/)[0];
      var conditiondiv = document.getElementById("conditiondiv"+cnt);
      conditionCreator(conditiondiv,cnt);
      i++;
      $('.selectcustom').select2();
    };

    
    
  }

  function conditionCreator(conditiondiv,cnt)
  {
    var ifLabel=document.createElement("label");
    ifLabel.style.paddingRight="10px";
    ifLabel.innerHTML="If ";
    rulenumber[cnt].push(i);
    
    var div = document.createElement("div");
    var selectList = document.createElement("select");
    var conditionList = document.createElement("select");
    var conditionInput = document.createElement("input");
    var removeLink = document.createElement("a");
    
    div.id="div"+i;
    selectList.id = "optionField"+i;
    selectList.style.width="20%";
    selectList.className="selectcustom";
    conditionList.id = "conditionField"+i;
    conditionList.className="selectcustom";
    conditionList.style.width="15%";
    conditionInput.id="conditionInput"+i;
    removeLink.id="removeLink"+i;
    removeLink.innerHTML="Remove";
    
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,selectList,"new");
    equalsOptionGenerator(conditionList);
    div.appendChild(ifLabel);
    div.appendChild(selectList);
    div.appendChild(conditionList);
    div.appendChild(conditionInput);
    div.appendChild(removeLink);
    conditiondiv.appendChild(div);
    $('.selectcustom').select2();
    document.getElementById("removeLink"+i).onclick = function() {
      var nbr=this.id.match(/\d+$/)[0];
      
      $('#div'+nbr).remove();
      var intVal=parseInt(nbr);
      for(var k in rulenumber)
      {
        var index = rulenumber[k].indexOf(intVal);
        if (index > -1) {
          rulenumber[k].splice(index, 1);
        }
      }
    };
    conditionArray.push(i);
  }

  function download(text) 
  {
    var head = document.getElementById('head').value;
    var firstHalfTemp=firstHalf.replace('{{FormHeading}}',head)
    text= firstHalfTemp+text+secondHalf;
    var a = document.getElementById("a");
    var file = new Blob([text], {type: "text/html"});
    a.href = URL.createObjectURL(file);
    a.style.display="block";
    a.download = head+".html";
  }
  document.getElementById("downloadBtn").addEventListener("click",function(){
    //updateFieldDropdowns();
    $('.render-wrap').formRender({
      formData: formBuilder.formData,
      templates: templates
    });
    renderJS();

    var toberemoved=document.getElementById("toberemoved");
    toberemoved.parentElement.removeChild(toberemoved );

    var text=document.getElementById("render-wrap").outerHTML;
    var head = document.getElementById('head').value;
    if(!head)head="";
    var firstHalfTemp=firstHalf.replace(/{{FormHeading}}/g,head)
    text= firstHalfTemp+text+secondHalf;
    var file = new Blob([text], {type: "text/html"});
    var link = document.createElement("a");
    if(head)link.download = head+".html";
    else link.download = "mGT_Form.html";
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
    renderJS();
  });
  function renderJS()
  {
    var js=document.createElement("script");
    js.type="text/javascript";
    js.id="jsScript";
    var str="";
    for(var k in rulenumber)
    {
      var iWantTo=document.getElementById("iWantTo"+k);
      if(iWantTo){
        var val = iWantTo.options[iWantTo.selectedIndex].value

        var conditionSelect=document.getElementById("conditionSelect"+k);
        var conditionSelectValue = conditionSelect.options[conditionSelect.selectedIndex].value
        str += checkAgainst(val,conditionSelectValue,k);
      }
      
      
    }
    // form submit validation codes
    var submitstring="";
    var onclickButtonTriggerString="var onSubmitClick=validation;";
    //var submitButton=document.getElementById("submitButtonList");
    //if(submitButton.options[submitButton.selectedIndex])
    if(true)
    {
      submitstring+="function validation(){";
      //var val = submitButton.options[submitButton.selectedIndex].value;
      onclickButtonTriggerString += `
      $('#tempsubmitbutton').bind('click',onSubmitClick);`;
      var cont = 0
      for(cont=0;cont<=submitrulenumber;cont++)
      {
        var submitConditionInputList = document.getElementById("submitConditionInputList"+cont);
        if(!submitConditionInputList) continue;
        var submitConditionInputVal = submitConditionInputList.options[submitConditionInputList.selectedIndex].value;
  
        var submitConditionOperationList=document.getElementById("submitConditionOperationList"+cont);
        var submitConditionOperationVal =  submitConditionOperationList.options[submitConditionOperationList.selectedIndex].value;
  
        var submitConditionValueList=document.getElementById("submitConditionValueList"+cont);
        var submitConditionValueVal=submitConditionValueList.options[submitConditionValueList.selectedIndex].value;
        
        var operator="";
        if(submitConditionOperationVal=="Is") operator="!";
        if(submitConditionValueVal=="Not Empty")
        {
          submitstring+=`
          if(`+operator+operator+`IsEmpty(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("value should not be empty ");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="Alphabet")
        {
          submitstring+=`if(`+operator+`IsAlphabet(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("value must be an alphabet");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="Numeric")
        {
          submitstring+=`if(`+operator+`IsNumeric(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("value must be an numeric");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="Alpha numeric")
        {
          submitstring+=`if(`+operator+`IsAlphaNumeric(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("value must be alpha numeric");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="EMail")
        {
          submitstring+=`if(`+operator+`IsValidEMail(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("Please enter valid email");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="Phone Number")
        {
          submitstring+=`if(`+operator+`IsValidPhone(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("Please enter valid phone number");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="URL")
        {
          submitstring+=`if(`+operator+`IsValidURL(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("Please enter valid URL");
            return false;
          }`;
        }
        
      }
      



      submitstring+=`
      return true;
    }`;
    }
    //form compute logic
    var computelogicstring="";
    if(computelogicnumber>=0)
    {
      var ct=0;
      for(ct=0;ct<=computelogicnumber;ct++)
      {
        var computelogicvalueofList = document.getElementById("computelogicvalueof"+ct);
        if(!computelogicvalueofList) continue;
        if(!computelogicvalueofList.options[computelogicvalueofList.selectedIndex]) continue;
        var computelogicvalueofVal = computelogicvalueofList.options[computelogicvalueofList.selectedIndex].value;
  
        var fromvalueofList = document.getElementById("fromvalueof"+ct);
        var fromvalueofListVal = fromvalueofList.options[fromvalueofList.selectedIndex].value;

        var oprList = document.getElementById("operand"+ct);
        var operandVal = oprList.options[oprList.selectedIndex].value;
        
        var rightValueList=document.getElementById("inputval"+ct);
        var rightValueListVal = rightValueList.options[rightValueList.selectedIndex].value;
        
        if(!rightValueListVal)continue;

        computelogicstring+=`
        var fromvalueofListVal`+ct+` = document.getElementById('`+fromvalueofListVal+`');
        var rightValueListVal`+ct+` = document.getElementById('`+rightValueListVal+`');
        var computelogicvalueofVal`+ct+` = document.getElementById('`+computelogicvalueofVal+`');
        
        computelogicvalueofVal`+ct+`.readOnly =true;
        fromvalueofListVal`+ct+`.addEventListener("change", function(){
          var compval = fromvalueofListVal`+ct+`.value;
          var opr = '`+operandVal+`';
          var inputval = rightValueListVal`+ct+`.value;
          computelogicvalueofVal`+ct+`.value = eval(compval+opr+inputval);
        }); 
        rightValueListVal`+ct+`.addEventListener("change", function(){
          var compval = fromvalueofListVal`+ct+`.value;
          var opr = '`+operandVal+`';
          var inputval = rightValueListVal`+ct+`.value;
          computelogicvalueofVal`+ct+`.value = eval(compval+opr+inputval);
        }); 
        
        `;
      }
     
    }
    var onblurComputeogic=``;
    if(scopecomputelogicnumber>=0)
    {
      var ct=0;
      for(ct=0;ct<=scopecomputelogicnumber;ct++)
      {
        var blurlist = document.getElementById("blurlist"+ct);
        if(blurlist)
        {
          if(blurlist.options[blurlist.selectedIndex])
          {
            var blurlistvalue=blurlist.options[blurlist.selectedIndex].value;
            var valueBoxVal=document.getElementById("valueBox"+ct).value;
            var targetList = document.getElementById("targetList"+ct);
            var targetId = targetList.options[targetList.selectedIndex].value;
            var targetValue = document.getElementById("targetValue"+ct).value;
            targetValue = targetValue.replace(/'/g,'"');
            
            onblurComputeogic+=`
            $('#`+blurlistvalue+`').on('change', function() {
              if(this.value=='`+valueBoxVal+`'){
                //var targetInput = document.getElementById(`+targetId+`);
                if( $('#`+targetId+`').is('SELECT') ){
                  var select = $('#`+targetId+`');
                  var jobj=JSON.parse('`+targetValue+`');
                  select.empty();
                  for (var key in jobj) {
                    select.append($("<option>").attr(\'value\',key).text(jobj[key]));
                  }
                }else{
                  $('#`+targetId+`').val('`+targetValue+`');
                }
              }else{
                
              }
            });
            `;
          }

        }
      }
    }
    str+=submitstring;
    str+=computelogicstring;
    str+=onblurComputeogic;
    str+=onclickButtonTriggerString;
    str+=validationScriptString;
    
    try{
      var item = document.getElementById("jsScript");
      item.parentNode.removeChild(item);
    }
    catch(e){

    }
    var col_class="col-sm-6";
    //var columnNumber = $("#columnSelection").val();commented out to remove column view of form
    var columnNumber = 1;
    if(columnNumber==1)col_class="col-sm-12";
    else if(columnNumber==3)col_class="col-sm-4";
    else col_class="col-sm-6";
    var innerHTML = document.getElementById("render-wrap").innerHTML;
    innerHTML = innerHTML.replace(/form-group/g, 'form-group '+col_class);
    var button_replace="fb-button form-group "+col_class;
    var re = new RegExp(button_replace,"g");
    document.getElementById("render-wrap").innerHTML=innerHTML.replace(re, 'fb-button form-group col-sm-12');
    // var noteLabel=document.createElement("label");
    // noteLabel.innerHTML="Note:Please avoid using special characters like %,&,etc in input values";
    // noteLabel.className="col-sm-12";
    // document.getElementById("rendered-form").appendChild(noteLabel);
    var logoURL = document.getElementById("logourl").value;
    var headTxt = document.getElementById("head").value
    if((logoURL&& logoURL!='')|| (headTxt&&headTxt!=null))
    {
      var cls="col-md-12";
      if(logoURL!='' && headTxt!='') cls="col-md-6";
      $('#render-wrap').prepend('<div class="row" id="headrowdiv"></div>')
      if(logoURL!='')$('#headrowdiv').append('<div class="'+cls+'" style="text-align:center;"><img src="'+logoURL+'" height="48"/></div>'); 
      if(headTxt!='')$('#headrowdiv').prepend('<div class="'+cls+'" style="text-align:center;">'+headTxt+'</div>'); 

      
    }
    var tempDiv = document.createElement("div");
    tempDiv.id="toberemoved";
    
    var btn = `<button type="button" class="btn btn-primary" name="tempsubmitbutton" style="primary" id="tempsubmitbutton">Submit</button>`;
    tempDiv.innerHTML=btn;
    document.getElementById("render-wrap").appendChild(tempDiv);
    
    var rowEquation=document.getElementById("textJS").value;
    var temp_str_fun="";
    if(rowEquation)
    {
      var equationString="";
      rowEquation=rowEquation.replace(/ /g,"");
      rowEquation=rowEquation.replace(/\r?\n|\r/g,"");
      var equation_array=rowEquation.split(";");
      for(var len=0;len<equation_array.length;len++)
      {
        var item=equation_array[len];
        if(item=="") continue;
        var side_array=item.split("=");
        if(side_array.length!=2){
          alert("Please write a qualified equation. Error on line number "+len);
          break;
        }
        var lhsElement = document.getElementById(side_array[0]);
        var elements=side_array[1].split(/[*+-/)(]+/);
        elements.push(side_array[0]);
        var validationResult = validateElement(elements)
        if(!validationResult) {
          equationString="";
          break;
        }
        equationString+=validationResult;
        equationString+=`$('#`+side_array[0]+`').val(isNaN(`+side_array[1]+`)?0:`+side_array[1]+`);
        `;
        
        
      }
      if(equationString!=""){
        temp_str_fun=`
        $('form').on('keyup change', 'input, select, textarea', function(){
            `+equationString+`
        });`;
      }
    }
    //js.innerHTML="(function(){"+str+"})()";
    js.text=`
    `+str+`
    `+temp_str_fun+`
    `;

    document.getElementById("render-wrap").appendChild(js);
    
  }
  
  function validateElement(elements)
  {
    var string="";
    elements = elements.filter(function(el, index, arr) {
      return index === arr.indexOf(el);
    });
    for(var el=0;el<elements.length;el++){
      if(!isNaN(elements[el]))continue;
      var domel = document.getElementById(elements[el]);
      if(!domel){
        alert("Element with id "+elements[el]+ " not found. Please review your equation");
        string="";
        return false;
      }
      string+=`var `+elements[el]+`=parseFloat($('#`+elements[el]+`').val());
      `;

    }
    return string;
  }
  function checkAgainst(action,con,k)
  {
    var JSString = "";
    var selectedValues = [];  
    var conditionArray = rulenumber[k];

    
    $("#wantToFields"+k+" :selected").each(function(){

        selectedValues.push($(this).val()); 
    });
    if(selectedValues.length<=0) return "";
    selectedValues.forEach(function(flds){
      if(action=="Show")JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
      else if(action=="Hide")JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
      else if(action=="Disable")JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
      else if(action=="Enable")JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
    });
        

    conditionArray.forEach(function(nbr){

      
      var lhsElement=document.getElementById("optionField"+nbr);
      var lhsValue= lhsElement.options[lhsElement.selectedIndex].value;
      var rhsValue=document.getElementById("conditionInput"+nbr).value;

      JSString+='document.getElementsByName("'+lhsValue+'")[0]'+
      '.addEventListener("change", function(e) {'+
        "conditionCheck"+k+"();"+
      '});';
    });
    JSString+="function conditionCheck"+k+"(){";
    
    conditionArray.forEach(function(nbr){
      var lhsElement=document.getElementById("optionField"+nbr);
      var lhsValue= lhsElement.options[lhsElement.selectedIndex].value;
      var rhsValue=document.getElementById("conditionInput"+nbr).value;
      var comparisonElement=document.getElementById("conditionField"+nbr);
      var comparisonValue=comparisonElement.options[comparisonElement.selectedIndex].value;
      
      JSString+="var val"+nbr+"=document.getElementsByName('"+lhsValue+"')[0].value;";
      
      

    });
    var temp_string="if(";
    var cur_cnt=0;
    var oprn="";
    if(con=="All") oprn="&&";
    else if(con=="None") oprn="&&";
    else if(con=="Any") oprn="||";
    
    conditionArray.forEach(function(nbr){
      var comparisonElement=document.getElementById("conditionField"+nbr);
      var comparisonValue=comparisonElement.options[comparisonElement.selectedIndex].value;
      var rhsValue=document.getElementById("conditionInput"+nbr).value;
      rhsValue="'"+rhsValue+"'";
      if(comparisonValue=="Equals"){
        
        temp_string+='val'+nbr+'=='+rhsValue;
      }
      else if(comparisonValue=="Not Equals"){
        temp_string+='val'+nbr+'!='+rhsValue; 
      }
      else if(comparisonValue=="Contains"){
        temp_string+='val'+nbr+'.indexOf('+rhsValue+')!==-1';  
      }

      if(cur_cnt<conditionArray.length-1){
        temp_string+=oprn;
      }
      cur_cnt++;
      

    });
    
    JSString+=temp_string+"){";
    if(action=="Disable"){
      selectedValues.forEach(function(flds){
        if(con!="None")
          //JSString+='document.getElementsByName("'+flds+'")[0].disabled =true;';
          JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
        else
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
      });
      JSString+='}else{';
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
        else
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
      });
      JSString+='}';
    }
    else if(action=="Enable"){
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
        else
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
      });
      JSString+='}else{';
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
        else
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
      });
      JSString+='}';
    }
    else if(action=="Show"){
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
        else
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
      });
      JSString+='}else{';
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
        else
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
      });
      JSString+='}';
    }
    else if(action=="Hide"){
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
        else
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
      });
      JSString+='}else{';
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
        else
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
      });
      JSString+=`}`;
    }

    JSString+=`}`;
    
    return JSString;
  }
  //commented out to remove support for column view render
  // document.getElementById("columnSelection").addEventListener("change",function(){
  //   //updateFieldDropdowns();
  //   $('.render-wrap').formRender({
  //     formData: formBuilder.formData,
  //     templates: templates
  //   });
  //   renderJS();
  // })
document.getElementById("addOnBlurLogic").onclick=onBlurRuleCreator;
function onBlurRuleCreator()
{
  var parentDiv=document.getElementById("onBlurLogics");
  var scopeDiv = document.createElement("div");
  scopeDiv.id="blurscopediv"+scopecomputelogicnumber;
  scopeDiv.style.margin="10px";

  var blurList = document.createElement("select");
  blurList.id = "blurlist"+scopecomputelogicnumber;
  blurList.style.width="20%";
  blurList.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,blurList,"new");
  }

  var isLabel = document.createElement("label");
  isLabel.innerHTML=" is ";

  var valueBox=document.createElement("input");
  valueBox.id="valueBox"+scopecomputelogicnumber;

  var thenLabel = document.createElement("label");
  thenLabel.innerHTML=" then value of ";

  var targetList = document.createElement("select");
  targetList.id = "targetList"+scopecomputelogicnumber;
  targetList.style.width="20%";
  targetList.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,targetList,"new");
  }

  var equalsLabel=document.createElement("label");
  equalsLabel.innerHTML=" = ";

  var targetValue=document.createElement("input");
  targetValue.id="targetValue"+scopecomputelogicnumber;
  
  
  scopeDiv.appendChild(blurList);
  scopeDiv.appendChild(isLabel);
  scopeDiv.appendChild(valueBox);
  scopeDiv.appendChild(thenLabel);
  scopeDiv.appendChild(targetList);
  scopeDiv.appendChild(equalsLabel);
  scopeDiv.appendChild(targetValue);
  parentDiv.appendChild(scopeDiv);
  $('.selectcustom').select2();
  scopecomputelogicnumber++;

}
document.getElementById("addComputeLogic").onclick=computeRuleCreator;
function computeRuleCreator()
{
  var parentDiv=document.getElementById("computeLogicDiv");
  var scopeDiv = document.createElement("div");
  scopeDiv.id="scopediv"+computelogicnumber;
  scopeDiv.style.margin="10px";
  var scopelabel = document.createElement("label");
  scopelabel.innerHTML="value of"
  scopelabel.style.paddingRight="10px";

  var computelogicvalueof = document.createElement("select");
  computelogicvalueof.id = "computelogicvalueof"+computelogicnumber;
  computelogicvalueof.style.width="20%";
  computelogicvalueof.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,computelogicvalueof,"new");
  }
  var fromlabel = document.createElement("label");
  fromlabel.innerHTML="From value of "
  fromlabel.style.paddingRight="10px";

  var fromvalueof = document.createElement("select");
  fromvalueof.id = "fromvalueof"+computelogicnumber;
  fromvalueof.style.width="20%";
  fromvalueof.style.paddingRight="10px";
  fromvalueof.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,fromvalueof,"new");
  }


  var operand = document.createElement("select");
  operand.id = "operand"+computelogicnumber;
  operand.style.width="5%";
  operand.style.paddingRight="10px";
  operand.className="selectcustom";
  operand.innerHTML=`<option>*</option>
  <option>+</option>
  <option>-</option>
  <option>/</option>`;
  var inputval = document.createElement("select");
  inputval.id="inputval"+computelogicnumber;
  inputval.style.width="20%";
  inputval.style.paddingRight="10px";
  inputval.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,inputval,"new");
  }
  scopeDiv.appendChild(scopelabel);
  scopeDiv.appendChild(computelogicvalueof);
  scopeDiv.appendChild(fromlabel);
  scopeDiv.appendChild(fromvalueof);
  scopeDiv.appendChild(operand);
  scopeDiv.appendChild(inputval);

  parentDiv.appendChild(scopeDiv);

  $('.selectcustom').select2();
  computelogicnumber++;
}
document.getElementById("addformrule").onclick=  function submitruleCreator()
{
  var parentDiv=document.getElementById("submitValidationconditions");
  var scopeDiv = document.createElement("div");
  scopeDiv.id="scopediv"+submitrulenumber;
  scopeDiv.style.margin="10px";
  var scopelabel1 = document.createElement("label");
  scopelabel1.innerHTML="If"
  scopelabel1.style.paddingRight="10px";
  var submitConditionInputList = document.createElement("select");
  submitConditionInputList.id = "submitConditionInputList"+submitrulenumber;
  submitConditionInputList.style.width="20%";
  submitConditionInputList.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,submitConditionInputList,"new");
  }

  var submitConditionOperationList = document.createElement("select");
  submitConditionOperationList.id = "submitConditionOperationList"+submitrulenumber;
  submitConditionOperationList.style.width="10%";
  submitConditionOperationList.className="selectcustom";
  submitConditionOperationList.innerHTML=`<option>Is</option>
  <option>Is Not</option>`;

  var submitConditionValueList = document.createElement("select");
  submitConditionValueList.id = "submitConditionValueList"+submitrulenumber;
  submitConditionValueList.style.width="20%";
  submitConditionValueList.className="selectcustom";
  submitConditionValueList.innerHTML=`<option>Not Empty</option>
  <option>Alphabet</option>
  <option>Numeric</option>
  <option>Alpha numeric</option>
  <option>EMail</option>
  <option>Phone Number</option>
  <option>URL</option>`;

  scopeDiv.appendChild(scopelabel1);
  scopeDiv.appendChild(submitConditionInputList);
  scopeDiv.appendChild(submitConditionOperationList);
  scopeDiv.appendChild(submitConditionValueList);
  parentDiv.appendChild(scopeDiv);

  $('.selectcustom').select2();
  submitrulenumber++;
};
  
});
