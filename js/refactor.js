

$(function() {


  var model =  {

    data: [],

    add: function(obj) {
      this.data.push(obj)
    },


  }


  var octopus =  {

    updateRecords: function() {
      model.data = [];
      for (let i=0; i<view.getAllNames().length; i++) {
        model.add({
          name: view.getName(i),
          days: view.getChecks(i),
          totalMissed: view.getDaysMissed(i),
        });

        view.setDaysMissed(i);
      }
    },


    init: function() {
      view.init();
    },

  }


  var view =  {

    init: function() {
      view.checkListener();
    },

    getAllNames: function() {
      let allNames = document.querySelectorAll('.name-col');
      return Array.from(allNames);
    },

    getName: function(i) {
      let studentName = view.getAllNames()[i].innerHTML;
      return studentName;
    },

    getChecks: function(i) {
      let name = view.getAllNames()[i];
      let row = name.parentElement;
      let boxes = row.querySelectorAll('.attend-col');
      let boxArray = Array.from(boxes);
      let checks = [];

      boxArray.forEach(function(box){
        let input = box.firstChild;
        let status = input.checked;
        checks.push(status);
      })

      return checks;

    },

    getDaysMissed: function(i){
      let name = view.getAllNames()[i];
      let row = name.parentElement;
      let boxes = row.querySelectorAll('.attend-col');
      let boxArray = Array.from(boxes);
      let missed = 0;  

      boxArray.forEach(function(box){
        let input = box.firstChild;
        let status = input.checked;
        if (!status) {
          missed++;
        }
      });
      return missed;
    },

    setDaysMissed: function(i){
      let name = view.getAllNames()[i];
      let row = name.parentElement;
      let totals = row.querySelectorAll('.missed-col');
      let totalsArray = Array.from(totals);

      totalsArray.forEach(function(total) {
        total.innerText = view.getDaysMissed(i);
      })
    },

    checkListener: function() {
      let boxCells = document.querySelectorAll('.attend-col input');
      let boxCellsArray = Array.from(boxCells);

      boxCellsArray.forEach(function(box, index){
        box.addEventListener('click', function(){
          octopus.updateRecords();
        })
      });
    },

  }

  octopus.init();


});
