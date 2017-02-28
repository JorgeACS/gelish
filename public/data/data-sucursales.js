function cargarGraficas() {
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            month: '2016-01',
            x : 1,
            hermosillo: 2666,
            guaymas: null,
            nogales: 2647
        }, {
            month: '2016-02',
            x : 2,
            hermosillo: 2778,
            guaymas: 2294,
            nogales: 2441
        }, {
            month: '2016-03',
            x : 3,
            hermosillo: 4912,
            guaymas: 1969,
            nogales: 2501
        }, {
            month: '2016-04',
            x : 4,
            hermosillo: 3767,
            guaymas: 3597,
            nogales: 5689
        }, {
            month: '2016-05',
            x : 5,
            hermosillo: 6810,
            guaymas: 1914,
            nogales: 2293
        }, {
            month: '2016-06',
            x : 6,
            hermosillo: 5670,
            guaymas: 4293,
            nogales: 1881
        }, {
            month: '2016-07',
            x : 7,
            hermosillo: 4820,
            guaymas: 3795,
            nogales: 1588
        }, {
            month: '2016-08',
            x : 8,
            hermosillo: 15073,
            guaymas: 5967,
            nogales: 5175
        }, {
            month: '2016-09',
            x : 9,
            hermosillo: 10687,
            guaymas: 4460,
            nogales: 2028
        }, {
            month: '2016-10',
            x : 10,
            hermosillo: 8432,
            guaymas: 5713,
            nogales: 1791
        }, {
            month: '2016-11',
            x : 11,
            hermosillo: 5291,
            guaymas: 3159,
            nogales: 2514
        }, {
            month: '2016-12',
            x : 12,
            hermosillo: 10929,
            guaymas: 7102,
            nogales: 1204
        }],
        xkey: 'month',
        ykeys: ['hermosillo', 'guaymas', 'nogales'],
        labels: ['Hermosillo', 'Guaymas', 'Nogales'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

     Morris.Area({
        element: 'morris-bar-chart',
        data: [{
            year: '2016',
            x : 1,
            hermosillo: 26660,
            guaymas: null,
            nogales: 52010
        }, {
            year: '2015',
            x : 2,
            hermosillo: 52778,
            guaymas: 12294,
            nogales: 32441
        }, {
            year: '2014',
            x : 3,
            hermosillo: 24912,
            guaymas: 11969,
            nogales: 52501
        }, {
            year: '2013',
            x : 4,
            hermosillo: 32767,
            guaymas: 23597,
            nogales: 25689
        }, {
            year: '2012',
            x : 5,
            hermosillo: 46810,
            guaymas: 21914,
            nogales: 12293
        }, {
            year: '2011',
            x : 6,
            hermosillo: 15670,
            guaymas: 24293,
            nogales: 31881
        }, {
            year: '2010',
            x : 12,
            hermosillo: 10929,
            guaymas: 37102,
            nogales: 31204
        }],
        xkey: 'year',
        ykeys: ['hermosillo', 'guaymas', 'nogales'],
        labels: ['Hermosillo', 'Guaymas', 'Nogales'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
};
