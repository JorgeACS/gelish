function cargarGraficas() {
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            month: '2016-01',
            x : 1,
            Dila: 2666,
            Cantabria: null
        }, {
            month: '2016-02',
            x : 2,
            Dila: 2778,
            Cantabria: 2294
        }, {
            month: '2016-03',
            x : 3,
            Dila: 4912,
            Cantabria: 1969
        }, {
            month: '2016-04',
            x : 4,
            Dila: 3767,
            Cantabria: 3597
        }, {
            month: '2016-05',
            x : 5,
            Dila: 6810,
            Cantabria: 1914
        }, {
            month: '2016-06',
            x : 6,
            Dila: 5670,
            Cantabria: 4293
        }, {
            month: '2016-07',
            x : 7,
            Dila: 4820,
            Cantabria: 3795
        }, {
            month: '2016-08',
            x : 8,
            Dila: 15073,
            Cantabria: 5967
        }, {
            month: '2016-09',
            x : 9,
            Dila: 10687,
            Cantabria: 4460
        }, {
            month: '2016-10',
            x : 10,
            Dila: 8432,
            Cantabria: 5713
        }, {
            month: '2016-11',
            x : 11,
            Dila: 5291,
            Cantabria: 3159
        }, {
            month: '2016-12',
            x : 12,
            Dila: 10929,
            Cantabria: 7102
        }],
        xkey: 'month',
        ykeys: ['Dila', 'Cantabria'],
        labels: ['Dila', 'Cantabria'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

     Morris.Area({
        element: 'morris-bar-chart',
        data: [{
            year: '2016',
            x : 1,
            Dila: 26660,
            Cantabria: null
        }, {
            year: '2015',
            x : 2,
            Dila: 52778,
            Cantabria: 12294
        }, {
            year: '2014',
            x : 3,
            Dila: 24912,
            Cantabria: 11969
        }, {
            year: '2013',
            x : 4,
            Dila: 32767,
            Cantabria: 23597
        }, {
            year: '2012',
            x : 5,
            Dila: 46810,
            Cantabria: 21914
        }, {
            year: '2011',
            x : 6,
            Dila: 15670,
            Cantabria: 24293
        }, {
            year: '2010',
            x : 12,
            Dila: 10929,
            Cantabria: 37102
        }],
        xkey: 'year',
        ykeys: ['Dila', 'Cantabria'],
        labels: ['Dila', 'Cantabria'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
};
