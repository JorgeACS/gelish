function cargarGraficas() {
    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Giovana",
            value: 1500
        }, {
            label: "Miriam",
            value: 1200
        }, {
            label: "Karla",
            value: 800
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-line-chart',
        data: [{
            y: 'Giovana',
            enero: 100,
            febrero: 90
        }, {
            y: 'Miriam',
            enero: 75,
            febrero: 65
        }, {
            y: 'Norma',
            enero: 50,
            febrero: 40
        }, {
            y: 'Miriam',
            enero: 75,
            febrero: 65
        }, {
            y: 'Mayela',
            enero: 50,
            febrero: 40
        }, {
            y: 'Adriana',
            enero: 75,
            febrero: 65
        }, {
            y: 'Karla',
            enero: 100,
            febrero: 90
        }],
        xkey: 'y',
        ykeys: ['enero', 'febrero'],
        labels: ['Enero', 'Febrero'],
        hideHover: 'auto',
        resize: true
    });
};