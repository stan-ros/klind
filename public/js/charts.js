 google.load("visualization", "1", {
     packages: ["corechart"]
 });
 google.setOnLoadCallback(queryData);

function queryData(){
    var link = "https://docs.google.com/spreadsheet/ccc?key=0AtX2kgzxsxZTdHcxblAwRUg4ak9ETjgzRjVaUXBsRUE&usp=sharing";
    
    var query = new google.visualization.Query(link);
    var firstRow = 4;
    var lastRow = 206;
    var queryString = 'SELECT B, I limit '+(lastRow-firstRow+1)+' offset '+(firstRow-2);
    query.setQuery(queryString);
    query.send(drawChart);
}
 function drawChart(response) {
    
     var data = response.getDataTable();
    //  var data = google.visualization.arrayToDataTable([
    //      ['Year', 'Sales', 'Expenses'],
    //      ['2004', 1000, 400],
    //      ['2005', 1170, 460],
    //      ['2006', 660, 1120],
    //      ['2007', 1030, 540]
    //  ]);

     var options = {
         title: 'Micex Cleared'
     };

     var chart = new google.visualization.LineChart(document.getElementById('micexClearedChart'));
     chart.draw(data, options);
 }