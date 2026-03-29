/**
 * Motor Paramétrico para ArquiGen
 * Lote Estándar: 6.00m x 15.00m
 * Generación de Plantas, Expresión Gráfica y Validación de Normas RNE.
 */

const LOTE_W = 6;
const LOTE_H = 15;
const AREA_TERRENO = LOTE_W * LOTE_H;
const MIN_AREA_LIBRE = AREA_TERRENO * 0.3; // 27 m2

const layouts = {
    1: { 
        ambientes: [
            { id: 'p1', name: 'Patio Posterior', type: 'patio', x: 0, y: 12, w: 6, h: 3, npt: '+0.00' },
            { id: 'p2', name: 'Patio Central', type: 'patio', x: 0, y: 5, w: 2.5, h: 3.8, npt: '+0.00' },
            { id: 's1', name: 'Sala / Comedor', type: 'social', x: 0, y: 0.15, w: 6, h: 4.85, npt: '+0.15' },
            { id: 'c1', name: 'Pasillo', type: 'circulacion', x: 4.8, y: 5, w: 1.2, h: 7, npt: '+0.15' },
            { id: 'srv1', name: 'Cocina', type: 'servicio', x: 2.5, y: 5, w: 2.3, h: 2.5, npt: '+0.15' },
            { id: 'srv2', name: 'Baño', type: 'servicio', x: 2.5, y: 7.5, w: 2.3, h: 1.3, npt: '+0.15' },
            { id: 'int1', name: 'Dormitorio Principal', type: 'intima', x: 0, y: 8.8, w: 4.8, h: 3.2, npt: '+0.15' },
        ],
        muros: [
            { x: 0, y: 0, w: 6, h: 0.15 }, 
            { x: 0, y: 14.85, w: 6, h: 0.15 }, 
            { x: 0, y: 0.15, w: 0.15, h: 14.7 }, 
            { x: 5.85, y: 0.15, w: 0.15, h: 14.7 }, 
            { x: 0.15, y: 4.85, w: 4.5, h: 0.15 }, 
            { x: 4.65, y: 5.0, w: 0.15, h: 7 }, 
            { x: 2.5, y: 5.0, w: 0.15, h: 3.8 }, 
            { x: 2.65, y: 7.35, w: 2.0, h: 0.15 }, 
            { x: 0.15, y: 8.65, w: 4.5, h: 0.15 }, 
            { x: 0.15, y: 11.85, w: 5.7, h: 0.15 }, 
        ],
        vanos: [
            { type: 'door', orient: 'H', x: 4.8, y: 0, size: 1.0, swing: 1, sweepDir: 'R' },
            { type: 'window', orient: 'H', x: 1, y: 0, size: 2.5 }, 
            { type: 'door', orient: 'V', x: 4.65, y: 6.2, size: 0.8, swing: -1, sweepDir: 'L' }, 
            { type: 'door', orient: 'V', x: 4.65, y: 7.8, size: 0.7, swing: -1, sweepDir: 'R' }, 
            { type: 'door', orient: 'V', x: 4.65, y: 10, size: 0.8, swing: -1, sweepDir: 'L' }, 
            { type: 'window', orient: 'H', x: 2.65, y: 4.85, size: 1.5 }, 
            { type: 'window', orient: 'H', x: 1.0, y: 11.85, size: 2.0 },
        ],
        cotas: [
            { x1: 0.15, y1: 2.5, x2: 5.85, y2: 2.5, text: '5.70m' }, // Sala X
            { x1: 2.65, y1: 6.2, x2: 4.65, y2: 6.2, text: '2.00m' }, // Cocina X
            { x1: 0.15, y1: 10.5, x2: 4.65, y2: 10.5, text: '4.50m' }, // Dormitorio X
            { x1: 1.25, y1: 8.8, x2: 1.25, y2: 11.85, text: '3.05m' }, // Dorm Y
            { x1: 3.5, y1: 5.0, x2: 3.5, y2: 7.35, text: '2.35m' } // Cocina Y
        ],
        mobiliario: [
            { type: 'sofa', x: 0.5, y: 3.5, rot: -90 },
            { type: 'sofa', x: 1.5, y: 1.5, rot: 0 },
            { type: 'tv', x: 0.2, y: 2.5, rot: -90 },
            { type: 'dining', x: 3.5, y: 3.5, rot: 0 },
            { type: 'kitchen', x: 2.65, y: 5.15, rot: 0, w: 2.0, h: 0.6 },
            { type: 'shower', x: 2.65, y: 7.6, rot: 0 },
            { type: 'toilet', x: 3.65, y: 7.7, rot: 0 },
            { type: 'sink', x: 4.8, y: 7.6, rot: 90 },
            { type: 'bed_double', x: 0.5, y: 11.0, rot: -90 },
            { type: 'desk', x: 3.5, y: 11.2, rot: 0, w: 1.0, h: 0.5 },
            { type: 'closet', x: 2.5, y: 8.85, rot: 0, w: 2.0, h: 0.6 }
        ]
    },
    2: { 
        ambientes: [
            { id: 'p1', name: 'Patio Trasero', type: 'patio', x: 3.5, y: 11, w: 2.5, h: 4, npt: '+0.00' },
            { id: 'p2', name: 'Patio Central', type: 'patio', x: 0, y: 4.5, w: 2.5, h: 6.8, npt: '+0.00' },
            { id: 's1', name: 'Sala / Comedor', type: 'social', x: 0, y: 0.15, w: 6, h: 4.35, npt: '+0.15' },
            { id: 'c1', name: 'Pasillo', type: 'circulacion', x: 2.5, y: 4.5, w: 1.0, h: 6.8, npt: '+0.15' },
            { id: 'srv1', name: 'Cocina', type: 'servicio', x: 3.5, y: 4.5, w: 2.35, h: 3, npt: '+0.15' },
            { id: 'srv2', name: 'Baño', type: 'servicio', x: 3.5, y: 7.5, w: 2.35, h: 1.3, npt: '+0.15' },
            { id: 'int1', name: 'Dormitorio 1', type: 'intima', x: 0, y: 11.3, w: 3.35, h: 3.55, npt: '+0.15' },
            { id: 'int2', name: 'Estudio', type: 'intima', x: 3.5, y: 8.8, w: 2.35, h: 2.2, npt: '+0.15' },
        ],
        muros: [
            { x: 0, y: 0, w: 6, h: 0.15 }, 
            { x: 0, y: 14.85, w: 6, h: 0.15 }, 
            { x: 0, y: 0.15, w: 0.15, h: 14.7 }, 
            { x: 5.85, y: 0.15, w: 0.15, h: 14.7 }, 
            { x: 0.15, y: 4.35, w: 2.2, h: 0.15 }, 
            { x: 3.5, y: 4.35, w: 2.35, h: 0.15 }, 
            { x: 2.35, y: 4.5, w: 0.15, h: 6.8 }, 
            { x: 3.35, y: 4.5, w: 0.15, h: 6.5 }, 
            { x: 3.5, y: 7.35, w: 2.35, h: 0.15 }, 
            { x: 3.5, y: 8.65, w: 2.35, h: 0.15 }, 
            { x: 3.5, y: 10.85, w: 2.35, h: 0.15 }, 
            { x: 0.15, y: 11.15, w: 3.35, h: 0.15 }, 
            { x: 3.35, y: 11.3, w: 0.15, h: 3.55 }, 
        ],
        vanos: [
            { type: 'door', orient: 'H', x: 4.5, y: 0, size: 1.0, hinge: 'R', swing: 1, sweepDir: 'R' },
            { type: 'window', orient: 'H', x: 0.5, y: 0, size: 3.0 },
            { type: 'door', orient: 'V', x: 3.35, y: 5.0, size: 0.8, hinge: 'L', swing: 1, sweepDir: 'R' }, 
            { type: 'door', orient: 'V', x: 3.35, y: 7.6, size: 0.7, hinge: 'R', swing: 1, sweepDir: 'L' }, 
            { type: 'door', orient: 'V', x: 3.35, y: 9.0, size: 0.8, hinge: 'L', swing: 1, sweepDir: 'R' }, 
            { type: 'door', orient: 'H', x: 2.5, y: 11.15, size: 0.8, hinge: 'L', swing: 1, sweepDir: 'L' }, 
            { type: 'window', orient: 'H', x: 0.5, y: 4.35, size: 1.5 }, 
            { type: 'window', orient: 'V', x: 2.35, y: 9.5, size: 1.5 }, 
            { type: 'window', orient: 'V', x: 3.35, y: 12.5, size: 1.5 } 
        ],
        cotas: [
            { x1: 0.15, y1: 2.5, x2: 5.85, y2: 2.5, text: '5.70m' }, // Sala X
            { x1: 3.5, y1: 5.5, x2: 5.85, y2: 5.5, text: '2.35m' }, // Cocina X
            { x1: 4.65, y1: 4.5, x2: 4.65, y2: 7.35, text: '2.85m' }, // Cocina Y
            { x1: 0.15, y1: 13.0, x2: 3.35, y2: 13.0, text: '3.20m' }, // Dormitorio X
            { x1: 1.25, y1: 11.3, x2: 1.25, y2: 14.85, text: '3.55m' }, // Dorm Y
        ],
        mobiliario: [
            { type: 'sofa', x: 0.5, y: 3.5, rot: -90 },
            { type: 'sofa', x: 1.8, y: 1.0, rot: 0 },
            { type: 'tv', x: 0.2, y: 2.0, rot: -90 },
            { type: 'dining', x: 4.0, y: 2.5, rot: 0 },
            { type: 'kitchen', x: 4.25, y: 4.65, rot: 90, w: 2.6, h: 0.6 },
            { type: 'shower', x: 3.65, y: 7.6, rot: 0 },
            { type: 'toilet', x: 4.7, y: 7.7, rot: 0 },
            { type: 'sink', x: 5.8, y: 7.6, rot: 90 },
            { type: 'bed_double', x: 0.5, y: 14.1, rot: -90 },
            { type: 'closet', x: 0.5, y: 11.45, rot: 0, w: 2.5, h: 0.6 },
            { type: 'tv', x: 3.2, y: 12.0, rot: 90 },
            { type: 'desk', x: 3.65, y: 9.0, rot: 0, w: 1.5, h: 0.5 }
        ]
    },
    3: { 
        ambientes: [
            { id: 'p1', name: 'Patio Lateral', type: 'patio', x: 0, y: 0, w: 1.8, h: 15, npt: '+0.00' },
            { id: 's1', name: 'Sala Estar', type: 'social', x: 1.8, y: 0.15, w: 4.05, h: 3.35, npt: '+0.15' },
            { id: 's2', name: 'Comedor', type: 'social', x: 1.8, y: 3.5, w: 4.05, h: 3, npt: '+0.15' },
            { id: 'c1', name: 'Circulación', type: 'circulacion', x: 4.6, y: 6.5, w: 1.25, h: 4.5, npt: '+0.15' },
            { id: 'srv1', name: 'Cocina', type: 'servicio', x: 1.8, y: 6.5, w: 2.8, h: 3, npt: '+0.15' },
            { id: 'srv2', name: 'Baño Común', type: 'servicio', x: 1.8, y: 9.5, w: 2.8, h: 1.5, npt: '+0.15' },
            { id: 'int1', name: 'Dorm. Premium', type: 'intima', x: 1.8, y: 11.15, w: 4.05, h: 3.7, npt: '+0.15' },
        ],
        muros: [
            { x: 0, y: 0, w: 6, h: 0.15 }, 
            { x: 0, y: 14.85, w: 6, h: 0.15 }, 
            { x: 0, y: 0.15, w: 0.15, h: 14.7 }, 
            { x: 5.85, y: 0.15, w: 0.15, h: 14.7 }, 
            { x: 1.65, y: 0.15, w: 0.15, h: 14.7 }, 
            { x: 1.8, y: 6.35, w: 2.8, h: 0.15 }, 
            { x: 4.6, y: 6.5, w: 0.15, h: 4.5 }, 
            { x: 1.8, y: 9.35, w: 2.8, h: 0.15 }, 
            { x: 1.8, y: 11.0, w: 4.05, h: 0.15 }, 
        ],
        vanos: [
            { type: 'door', orient: 'H', x: 4.5, y: 0, size: 1.0, hinge: 'R', swing: 1, sweepDir: 'R' },
            { type: 'window', orient: 'H', x: 2.0, y: 0, size: 2.0 },
            { type: 'window', orient: 'V', x: 1.65, y: 1.0, size: 2.0 },
            { type: 'window', orient: 'V', x: 1.65, y: 4.0, size: 1.5 },
            { type: 'window', orient: 'V', x: 1.65, y: 7.0, size: 1.5 },
            { type: 'window', orient: 'V', x: 1.65, y: 9.8, size: 0.6 },
            { type: 'door', orient: 'V', x: 4.6, y: 7.0, size: 0.8, swing: -1, sweepDir: 'L' },
            { type: 'door', orient: 'V', x: 4.6, y: 9.6, size: 0.7, hinge: 'R', swing: -1, sweepDir: 'L' },
            { type: 'door', orient: 'H', x: 4.6, y: 11.0, size: 0.8, hinge: 'R', swing: 1, sweepDir: 'R' },
            { type: 'window', orient: 'V', x: 1.65, y: 12, size: 2.0 }
        ],
        cotas: [
            { x1: 1.8, y1: 2.0, x2: 5.85, y2: 2.0, text: '4.05m' }, // Sala X
            { x1: 2.8, y1: 0.15, x2: 2.8, y2: 3.5, text: '3.35m' }, // Sala Y
            { x1: 1.8, y1: 7.5, x2: 4.6, y2: 7.5, text: '2.80m' }, // Cocina X
            { x1: 3.0, y1: 6.5, x2: 3.0, y2: 9.35, text: '2.85m' }, // Cocina Y
            { x1: 1.8, y1: 13.5, x2: 5.85, y2: 13.5, text: '4.05m' }, // Dormitorio X
            { x1: 3.5, y1: 11.15, x2: 3.5, y2: 14.85, text: '3.70m' }, // Dorm Y
        ],
        mobiliario: [
            { type: 'sofa', x: 2.2, y: 2.6, rot: -90 },
            { type: 'sofa', x: 3.5, y: 0.5, rot: 0 },
            { type: 'tv', x: 1.9, y: 1.5, rot: -90 },
            { type: 'dining', x: 4.0, y: 5.0, rot: 0 },
            { type: 'kitchen', x: 1.95, y: 6.65, rot: 0, w: 2.5, h: 0.6 },
            { type: 'shower', x: 1.95, y: 9.65, rot: 0 },
            { type: 'toilet', x: 3.0, y: 9.75, rot: 0 },
            { type: 'sink', x: 4.55, y: 9.65, rot: 90 },
            { type: 'bed_double', x: 2.5, y: 14.1, rot: -90 },
            { type: 'closet', x: 1.95, y: 11.3, rot: 0, w: 2.5, h: 0.6 },
            { type: 'desk', x: 5.8, y: 13.0, rot: 90, w: 1.2, h: 0.5 }
        ]
    }
};

class ArquiGenEngine {
    constructor() {
        this.currentProposal = 1;
        this.svgDoc = document.getElementById('cad-canvas');
        this.svgAmbientes = document.getElementById('ambientes-layer');
        this.svgVanos = document.getElementById('vanos-layer');
        this.svgMuros = document.getElementById('muros-layer');
        this.svgMobiliario = document.getElementById('mobiliario-layer');
        this.svgMaskHoles = document.getElementById('mask-holes');
        this.svgCotas = document.getElementById('cotas-layer');
        
        // Estado Interactivo
        this.activeIdx = null; // Can hold a vano or mobiliario index
        this.activeType = null; // 'mob' or 'vano'
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        const btns = document.querySelectorAll('.proposals-group .btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                btns.forEach(b => b.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                this.currentProposal = parseInt(target.getAttribute('data-prop'));
                this.activeIdx = null;
                this.render();
            });
        });

        this.svgDoc.addEventListener('pointerdown', this.onPointerDown.bind(this));
        this.svgDoc.addEventListener('pointermove', this.onPointerMove.bind(this));
        window.addEventListener('pointerup', this.onPointerUp.bind(this));
        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.activeIdx !== null) {
                e.preventDefault();
                if (this.activeType === 'mob') {
                    const mob = layouts[this.currentProposal].mobiliario[this.activeIdx];
                    mob.rot = (mob.rot + 90) % 360;
                    this.updateTransform(this.activeIdx, 'mob', mob);
                // Dinamismo para puertas/ventanas al presionar espacio
                } else if (this.activeType === 'vano') {
                    const vano = layouts[this.currentProposal].vanos[this.activeIdx];
                    if (vano.type === 'door') {
                        vano.swing *= -1;
                        if (vano.swing === 1) {
                            vano.sweepDir = vano.sweepDir === 'L' ? 'R' : 'L';
                        }
                    } else {
                        vano.orient = vano.orient === 'H' ? 'V' : 'H';
                    }
                    this.render();
                    setTimeout(() => {
                        const el = document.querySelector(`.draggable.vano[data-index="${this.activeIdx}"]`);
                        if(el) el.classList.add('selected');
                    }, 10);
                }
            }
        });

        const btnExport = document.getElementById('btn-export');
        if(btnExport) {
            btnExport.addEventListener('click', () => {
                window.print();
            });
        }
    }

    getMousePosition(evt) {
        const CTM = this.svgDoc.getScreenCTM();
        const pt = this.svgDoc.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        return pt.matrixTransform(CTM.inverse());
    }

    onPointerDown(evt) {
        document.querySelectorAll('.draggable.selected').forEach(el => el.classList.remove('selected'));
        
        const target = evt.target.closest('.draggable');
        if (target) {
            this.activeIdx = parseInt(target.getAttribute('data-index'));
            this.activeType = target.classList.contains('mob') ? 'mob' : 'vano';
            this.isDragging = true;
            const pt = this.getMousePosition(evt);
            
            let obj = null;
            if (this.activeType === 'mob') obj = layouts[this.currentProposal].mobiliario[this.activeIdx];
            if (this.activeType === 'vano') obj = layouts[this.currentProposal].vanos[this.activeIdx];
            
            this.dragOffset.x = pt.x - obj.x;
            this.dragOffset.y = pt.y - obj.y;
            target.classList.add('selected');
            target.parentNode.appendChild(target);
        } else {
            this.activeIdx = null;
            this.activeType = null;
            this.isDragging = false;
        }
    }

    onPointerMove(evt) {
        if (this.isDragging && this.activeIdx !== null) {
            evt.preventDefault();
            const pt = this.getMousePosition(evt);
            
            if (this.activeType === 'mob') {
                const mob = layouts[this.currentProposal].mobiliario[this.activeIdx];
                mob.x = pt.x - this.dragOffset.x;
                mob.y = pt.y - this.dragOffset.y;
                this.updateTransform(this.activeIdx, 'mob', mob);
            } else if (this.activeType === 'vano') {
                const vano = layouts[this.currentProposal].vanos[this.activeIdx];
                // Restrict movement to its axis (snap to nearest wall logic essentially lets it slide)
                if (vano.orient === 'H') {
                    vano.x = pt.x - this.dragOffset.x;
                } else {
                    vano.y = pt.y - this.dragOffset.y;
                }
                this.updateTransform(this.activeIdx, 'vano', vano);
            }
        }
    }

    onPointerUp() {
        this.isDragging = false;
    }

    updateTransform(index, type, obj) {
        const el = document.querySelector(`.draggable.${type}[data-index="${index}"]`);
        if (el) {
            if (type === 'mob') {
                el.setAttribute('transform', `translate(${obj.x}, ${obj.y}) rotate(${obj.rot})`);
            } else {
                el.setAttribute('transform', `translate(${obj.x}, ${obj.y})`);
                // Actulizar la máscara también para el vano!
                const maskRect = document.getElementById(`mask-hole-${index}`);
                if (maskRect) {
                    if (obj.orient === 'H') {
                        maskRect.setAttribute('x', obj.x);
                    } else {
                        maskRect.setAttribute('y', obj.y);
                    }
                }
            }
        }
    }

    render() {
        const data = layouts[this.currentProposal];
        this.clearCanvas();
        
        let areaLibre = 0;
        let areaTechada = 0;

        // Draw outer Cotas auto
        this.drawCota(0, -0.6, 6, -0.6, '6.00m');
        this.drawCota(0, 15.6, 6, 15.6, '6.00m');
        this.drawCota(-0.6, 0, -0.6, 15, '15.00m');
        this.drawCota(6.6, 0, 6.6, 15, '15.00m');

        if (data.cotas) {
            data.cotas.forEach(c => this.drawCota(c.x1, c.y1, c.x2, c.y2, c.text));
        }

        data.ambientes.forEach(amb => {
            const area = amb.w * amb.h;
            let css = `cad-room-${amb.type}`;
            if (amb.type === 'patio') {
                css = 'cad-patio';
                areaLibre += area;
            } else {
                areaTechada += area;
            }
            this.drawRoom(amb, css);
            this.drawLabel(amb, area);
        });

        data.muros.forEach(muro => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', muro.x);
            rect.setAttribute('y', muro.y);
            rect.setAttribute('width', muro.w);
            rect.setAttribute('height', muro.h);
            rect.setAttribute('class', 'cad-wall');
            this.svgMuros.appendChild(rect);
        });

        data.vanos.forEach((vano, index) => {
            this.drawVanoMask(vano, index);
            if (vano.type === 'door') this.drawDoor(vano, index);
            if (vano.type === 'window') this.drawWindow(vano, index);
        });

        if (data.mobiliario) {
            data.mobiliario.forEach((mob, index) => {
                this.drawMobiliario(mob, index);
            })
        }

        this.updateStats(areaLibre, areaTechada);
    }

    clearCanvas() {
        this.svgAmbientes.innerHTML = '';
        this.svgVanos.innerHTML = '';
        this.svgMuros.innerHTML = '';
        this.svgMobiliario.innerHTML = '';
        this.svgMaskHoles.innerHTML = '';
        this.svgCotas.innerHTML = '';
    }

    drawCota(x1, y1, x2, y2, textVal) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'cad-cota');

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1); line.setAttribute('y1', y1);
        line.setAttribute('x2', x2); line.setAttribute('y2', y2);

        const tick = 0.15;
        const tick1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick1.setAttribute('x1', x1 - tick); tick1.setAttribute('y1', y1 + tick);
        tick1.setAttribute('x2', x1 + tick); tick1.setAttribute('y2', y1 - tick);

        const tick2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick2.setAttribute('x1', x2 - tick); tick2.setAttribute('y1', y2 + tick);
        tick2.setAttribute('x2', x2 + tick); tick2.setAttribute('y2', y2 - tick);

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        
        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.setAttribute('x', midX);
        txt.setAttribute('y', midY - 0.08);
        txt.setAttribute('text-anchor', 'middle');
        txt.setAttribute('font-size', '0.22px');
        
        let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        if (Math.abs(angle) > 89 && Math.abs(angle) < 91) {
            txt.setAttribute('transform', `rotate(-90, ${midX}, ${midY})`);
            txt.setAttribute('y', midY - 0.08); 
        }
        
        txt.textContent = textVal;

        g.appendChild(line);
        g.appendChild(tick1);
        g.appendChild(tick2);
        g.appendChild(txt);
        this.svgCotas.appendChild(g);
    }

    drawRoom(amb, cssClass) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', amb.x);
        rect.setAttribute('y', amb.y);
        rect.setAttribute('width', amb.w);
        rect.setAttribute('height', amb.h);
        rect.setAttribute('class', cssClass);
        this.svgAmbientes.appendChild(rect);
    }

    drawLabel(amb, area) {
        let cx = amb.x + amb.w / 2;
        let cy = amb.y + amb.h / 2;
        if (amb.type === 'patio') cy -= 0.5; 
        
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', cx);
        text.setAttribute('y', cy - 0.1);
        text.setAttribute('class', 'cad-label bold');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '0.18px'); 
        text.textContent = amb.name.toUpperCase();

        const npt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        npt.setAttribute('x', cx);
        npt.setAttribute('y', cy + 0.1);
        npt.setAttribute('class', 'cad-label small');
        npt.setAttribute('text-anchor', 'middle');
        npt.setAttribute('font-size', '0.12px'); 
        npt.textContent = `N.P.T. ${amb.npt} / ${area.toFixed(2)}m²`;

        g.appendChild(text);
        g.appendChild(npt);
        this.svgAmbientes.appendChild(g);
    }
    
    drawVanoMask(vano, index) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('id', `mask-hole-${index}`);
        rect.setAttribute('fill', 'black');
        if (vano.orient === 'H') {
            rect.setAttribute('x', vano.x);
            rect.setAttribute('y', vano.y - 0.05); 
            rect.setAttribute('width', vano.size);
            rect.setAttribute('height', 0.25);
        } else {
            rect.setAttribute('x', vano.x - 0.05);
            rect.setAttribute('y', vano.y);
            rect.setAttribute('width', 0.25);
            rect.setAttribute('height', vano.size);
        }
        this.svgMaskHoles.appendChild(rect);
    }

    drawDoor({orient, x, y, size, swing, sweepDir}, index) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${x}, ${y})`);
        g.setAttribute('class', 'draggable vano');
        g.setAttribute('data-index', index);

        const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        
        arc.setAttribute('class', 'cad-door-arc');
        leaf.setAttribute('class', 'cad-door-leaf');

        let sx = 0, sy = 0;
        let hx = orient === 'H' ? (sweepDir === 'L' ? sx : sx + size) : sx + 0.075;
        let hy = orient === 'V' ? (sweepDir === 'L' ? sy : sy + size) : sy + 0.075;
        
        if (orient === 'H') {
            let tipY = hy + size * swing;
            leaf.setAttribute('x1', hx); leaf.setAttribute('y1', hy);
            leaf.setAttribute('x2', hx); leaf.setAttribute('y2', tipY);
            
            let ex = sweepDir === 'L' ? hx + size : hx - size;
            let sweepFlag = (sweepDir === 'L' && swing > 0) || (sweepDir === 'R' && swing < 0) ? 0 : 1;
            arc.setAttribute('d', `M ${hx} ${tipY} A ${size} ${size} 0 0 ${sweepFlag} ${ex} ${hy}`);
        } else {
            let tipX = hx + size * swing;
            leaf.setAttribute('x1', hx); leaf.setAttribute('y1', hy);
            leaf.setAttribute('x2', tipX); leaf.setAttribute('y2', hy);
            
            let ey = sweepDir === 'L' ? hy + size : hy - size;
            let sweepFlag = (sweepDir === 'L' && swing < 0) || (sweepDir === 'R' && swing > 0) ? 0 : 1;
            arc.setAttribute('d', `M ${tipX} ${hy} A ${size} ${size} 0 0 ${sweepFlag} ${hx} ${ey}`);
        }

        // Hitbox transparente grande para el vano
        const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        hit.setAttribute('x', orient==='H' ? 0 : -0.5); hit.setAttribute('y', orient==='V' ? 0 : -0.5);
        hit.setAttribute('width', orient==='H' ? size : 1); hit.setAttribute('height', orient==='V' ? size : 1);
        hit.setAttribute('fill', 'transparent'); hit.setAttribute('stroke', 'none');

        g.appendChild(hit);
        g.appendChild(arc);
        g.appendChild(leaf);
        this.svgVanos.appendChild(g);
    }

    drawWindow({orient, x, y, size}, index) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${x}, ${y})`);
        g.setAttribute('class', 'draggable vano');
        g.setAttribute('data-index', index);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('class', 'cad-window-glass');
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'cad-window');

        const thickness = 0.15;
        let sx = 0, sy = 0;

        if (orient === 'H') {
            rect.setAttribute('x', sx); rect.setAttribute('y', sy);
            rect.setAttribute('width', size); rect.setAttribute('height', thickness);
            line.setAttribute('x1', sx); line.setAttribute('y1', sy + thickness/2);
            line.setAttribute('x2', sx + size); line.setAttribute('y2', sy + thickness/2);
        } else {
            rect.setAttribute('x', sx); rect.setAttribute('y', sy);
            rect.setAttribute('width', thickness); rect.setAttribute('height', size);
            line.setAttribute('x1', sx + thickness/2); line.setAttribute('y1', sy);
            line.setAttribute('x2', sx + thickness/2); line.setAttribute('y2', sy + size);
        }

        // Hitbox transparente 
        const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        hit.setAttribute('x', orient==='H' ? 0 : -0.2); hit.setAttribute('y', orient==='V' ? 0 : -0.2);
        hit.setAttribute('width', orient==='H' ? size : 0.6); hit.setAttribute('height', orient==='V' ? size : 0.6);
        hit.setAttribute('fill', 'transparent'); hit.setAttribute('stroke', 'none');

        g.appendChild(hit);
        g.appendChild(rect);
        g.appendChild(line);
        this.svgVanos.appendChild(g);
    }

    drawMobiliario({type, x, y, rot, w=1, h=1}, index) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${x}, ${y}) rotate(${rot})`);
        
        const drawColor = '#cbd5e1';
        g.setAttribute('stroke', drawColor);
        g.setAttribute('stroke-width', '0.02');
        g.setAttribute('fill', 'transparent'); 
        g.setAttribute('class', 'draggable mob');
        g.setAttribute('data-index', index);
        
        if (type === 'bed_double') {
            let bw = 1.6, bh = 2.0;
            g.innerHTML = `<rect x="0" y="0" width="${bw}" height="${bh}" rx="0.05" /><rect x="0.1" y="0.1" width="0.65" height="0.35" rx="0.05" /><rect x="0.85" y="0.1" width="0.65" height="0.35" rx="0.05" /><path d="M 0 0.8 L 0.4 0.95 L 1.2 0.75 L ${bw} 0.9" stroke="${drawColor}" fill="none" /><rect x="0" y="0.8" width="${bw}" height="1.2" rx="0.05" fill="rgba(255,255,255,0.02)"/>`;
        } else if (type === 'bed_single') {
            let bw = 1.0, bh = 2.0;
            g.innerHTML = `<rect x="0" y="0" width="${bw}" height="${bh}" rx="0.05" /><rect x="0.1" y="0.1" width="0.8" height="0.35" rx="0.05" /><path d="M 0 0.8 L 0.5 0.95 L ${bw} 0.8" stroke="${drawColor}" fill="none" /><rect x="0" y="0.8" width="${bw}" height="1.2" rx="0.05" fill="rgba(255,255,255,0.02)"/>`;
        } else if (type === 'sofa') {
            let sw = 2.0, sh = 0.8;
            g.innerHTML = `<rect x="0" y="0" width="${sw}" height="${sh}" rx="0.1" /><rect x="0.1" y="0.2" width="${sw/2 - 0.1}" height="${sh-0.3}" rx="0.05" /><rect x="${sw/2}" y="0.2" width="${sw/2 - 0.1}" height="${sh-0.3}" rx="0.05" /><rect x="0.2" y="0.3" width="0.2" height="0.2" transform="rotate(15 0.3 0.4)" /><rect x="${sw - 0.4}" y="0.3" width="0.2" height="0.2" transform="rotate(-15 ${sw-0.3} 0.4)" />`;
        } else if (type === 'dining') {
            let dR = 0.6;
            g.innerHTML = `<circle cx="0" cy="0" r="${dR}" fill="rgba(255,255,255,0.02)" /><path d="M -0.2 -${dR+0.2} A 0.25 0.25 0 0 1 0.2 -${dR+0.2}" fill="none" /><path d="M -0.2 ${dR+0.2} A 0.25 0.25 0 0 0 0.2 ${dR+0.2}" fill="none" /><path d="M -${dR+0.2} -0.2 A 0.25 0.25 0 0 0 -${dR+0.2} 0.2" fill="none" /><path d="M ${dR+0.2} -0.2 A 0.25 0.25 0 0 1 ${dR+0.2} 0.2" fill="none" />`;
        } else if (type === 'desk') {
            g.innerHTML = `<rect x="0" y="0" width="${w}" height="${h}" /><path d="M ${w/2 - 0.25} ${h+0.1} A 0.25 0.25 0 0 0 ${w/2 + 0.25} ${h+0.1}" stroke="${drawColor}" fill="none" /><rect x="${w/2 - 0.2}" y="${h+0.1}" width="0.4" height="0.2" rx="0.05" />`;
        } else if (type === 'kitchen') {
            g.innerHTML = `<rect x="0" y="0" width="${w}" height="${h}" /><rect x="${w - 0.9}" y="0.1" width="0.8" height="0.4" rx="0.05" /><rect x="${w - 0.85}" y="0.15" width="0.3" height="0.3" rx="0.05" /><rect x="${w - 0.45}" y="0.15" width="0.3" height="0.3" rx="0.05" /><circle cx="${w - 0.5}" cy="0.05" r="0.02" /><path d="M ${w - 0.5} 0.05 v 0.1" /><rect x="0.2" y="0.1" width="0.6" height="${h-0.2}" fill="rgba(255,255,255,0.02)" /><circle cx="0.35" cy="0.25" r="0.1" /><circle cx="0.65" cy="0.25" r="0.1" /><circle cx="0.35" cy="0.55" r="0.1" /><circle cx="0.65" cy="0.55" r="0.1" />`;
        } else if (type === 'shower') {
            g.innerHTML = `<rect x="0" y="0" width="0.8" height="0.8" fill="none" /><line x1="0" y1="0" x2="0.8" y2="0.8" stroke-width="0.01" /><line x1="0.8" y1="0" x2="0" y2="0.8" stroke-width="0.01" /><circle cx="0.4" cy="0.4" r="0.05" />`;
        } else if (type === 'toilet') {
            g.innerHTML = `<rect x="0" y="0" width="0.15" height="0.3" rx="0.05" /><ellipse cx="0.25" cy="0.15" rx="0.18" ry="0.12" fill="none" />`;
        } else if (type === 'sink') {
            g.innerHTML = `<rect x="0" y="0" width="0.6" height="0.4" /><ellipse cx="0.3" cy="0.25" rx="0.2" ry="0.12" /><circle cx="0.3" cy="0.1" r="0.02" />`;
        } else if (type === 'closet') {
            let divs = '';
            let n = Math.floor(w / 0.5);
            for(let i=1; i<=n; i++) { divs += `<line x1="${i*(w/n)}" y1="0" x2="${i*(w/n)}" y2="${h}" />`; }
            g.innerHTML = `<rect x="0" y="0" width="${w}" height="${h}" fill="none" /><line x1="0" y1="0" x2="${w}" y2="${h}" stroke-width="0.01"/><line x1="${w}" y1="0" x2="0" y2="${h}" stroke-width="0.01"/>${divs}`;
        } else if (type === 'tv') {
            g.innerHTML = `<rect x="0" y="0" width="1.4" height="0.1" fill="none" rx="0.05" /><rect x="0.5" y="0.1" width="0.4" height="0.1" />`;
        }

        const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        hit.setAttribute('x', '-0.5'); hit.setAttribute('y', '-0.5');
        hit.setAttribute('width', (w===1?2:w)+1); hit.setAttribute('height', (h===1?2:h)+1);
        hit.setAttribute('fill', 'transparent'); hit.setAttribute('stroke', 'none');
        g.appendChild(hit);

        this.svgMobiliario.appendChild(g);
    }

    updateStats(libre, techada) {
        const elTechada = document.getElementById('val-techada');
        const elLibre = document.getElementById('val-libre');
        const elPorc = document.getElementById('val-porcentaje');

        elTechada.textContent = techada.toFixed(2) + ' m²';
        elLibre.textContent = libre.toFixed(2) + ' m²';
        
        const pctLibre = (libre / AREA_TERRENO) * 100;
        elPorc.textContent = Math.round(pctLibre) + '%';

        elTechada.className = `stat-value ${techada > 63 ? 'highlight-danger' : 'highlight-success'}`;
        elLibre.className = `stat-value ${libre < MIN_AREA_LIBRE ? 'highlight-danger' : 'highlight-success'}`;
        elPorc.className = `stat-value ${pctLibre < 30 ? 'highlight-danger' : 'highlight-success'}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.arquiEngine = new ArquiGenEngine();
});
