function cargarGraficas() {
    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Maria",
            value: 1500
        }, {
            label: "Fernanda",
            value: 1200
        }, {
            label: "Barbara",
            value: 800
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-line-chart',
        data: [{
            y: 'Maria',
            enero: 100,
            febrero: 90
        }, {
            y: 'Julia',
            enero: 75,
            febrero: 65
        }, {
            y: 'Barbara',
            enero: 50,
            febrero: 40
        }, {
            y: 'Fernanda',
            enero: 75,
            febrero: 65
        }, {
            y: 'Ana',
            enero: 50,
            febrero: 40
        }, {
            y: 'Athena',
            enero: 75,
            febrero: 65
        }, {
            y: 'Alejandra',
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