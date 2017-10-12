$(document).ready(function () {
  var templateNameKey = "tamplate_view";
  var tableView = "view-table";
  var listView = "view-list";
  var miniView = "mini";
  var viewId = '#catalog-view';
  var className = Cookies.get(templateNameKey) || tableView;

  var setView = function(className) {
    Cookies.set(templateNameKey,className);

    switch (className) {
    case tableView:
      $(viewId).removeClass(listView);
      $(viewId).removeClass(miniView);
      $(viewId).addClass(tableView);
      break;
    case listView:
      $(viewId).removeClass(tableView);
      $(viewId).removeClass(miniView);
      $(viewId).addClass(listView);
      break;
    case miniView:
      $(viewId).removeClass(tableView);
      $(viewId).addClass(miniView);
      $(viewId).addClass(listView);
    }
  }

  setView(className);

  $('.change-view input').each(function(key,value){
    $(value).prop('checked', false);
    $(value).parent().removeClass('checked');
    if($(value).val() === className){
      $(value).prop('checked', true);
      $(value).parent().addClass('checked');
    }
  });

  $('.change-view').on('ifChanged', function (e) {
    var t = $(e.target);

    if (t.is(':checked')) {
      var className = t.val();
      setView(className);
    }
  });

  if(window.innerWidth < 980){
    setView(tableView);
  }


});
