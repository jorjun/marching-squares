import { Grid } from './grid';
import { Vertex } from './vertex';

interface MarchingSquaresOptions {
	isoValue: number;
}

export class MarchingSquares {

	contours: Vertex[][] = [];

	constructor(readonly grid: Grid, readonly opts: MarchingSquaresOptions) {
	}

	update(): void {
		// const weights = [8, 4, 2, 1];

		// Evaluate the vertices
		this.grid.vertices.forEach(v => v.evaluate(this.opts.isoValue));

		// Interpolate the edges
		this.grid.edges.forEach(e => e.interpolate(this.opts.isoValue));

		// Generate contour lines
		this.contours = [];
		for (const cell of this.grid.cells) {
			switch (cell.code) {
				case 1:
				case 14:					
					this.contours.push([cell.edges[2].q, cell.edges[3].q])
					break;
				case 2:
				case 13:
					this.contours.push([cell.edges[1].q, cell.edges[2].q])
					break;
				case 3:
				case 12:
					this.contours.push([cell.edges[1].q, cell.edges[3].q])
					break;
				case 4:
				case 11:
					this.contours.push([cell.edges[0].q, cell.edges[1].q])
					break;
				case 5:
					this.contours.push([cell.edges[0].q, cell.edges[1].q])
					this.contours.push([cell.edges[2].q, cell.edges[3].q])
					break;
				case 10:
					this.contours.push([cell.edges[0].q, cell.edges[3].q])
					this.contours.push([cell.edges[1].q, cell.edges[2].q])
					break;
				case 6:
				case 9:
					this.contours.push([cell.edges[0].q, cell.edges[2].q])
					break;
				case 7:
				case 8:
					this.contours.push([cell.edges[0].q, cell.edges[3].q])
					break;
			}
		}

		// console.log('Contours:', this.contours);

		// // Evaluate the cells
		// for (let i = 0; i < this.grid.opts.gridSizeY; i++) {
		// 	for (let j = 0; j < this.grid.opts.gridSizeX; j++) {
		// 		const a = j + i * (this.grid.opts.gridSizeX + 1);
		// 		const b = a + 1;
		// 		const c = j + 1 + (i + 1) * (this.grid.opts.gridSizeX + 1);
		// 		const d = c - 1;
		// 		const indices = [a, b, c, d];
		// 		const signs = indices.map(k => this.grid.vertices[k].sign);
		// 		const code = signs.map(v => (v <= 0) ? 0 : 1).reduce((s, v, k) => s + v * weights[k], 0);
		// 		// console.log(code);
		// 		const intersects = !((code === 0) || (code === 15));
		// 		if (intersects) {
		// 			const p: Vertex[] = [];
		// 			for (let k = 0; k < 4; k++) {
		// 				const l = (k + 1) % 4;
		// 				if (signs[k] !== signs[l]) {
		// 					const p0 = this.grid.vertices[indices[k]];
		// 					const p1 = this.grid.vertices[indices[l]];
		// 					const q = new Vertex(
		// 						p0.x + (this.opts.isoValue - p0.value) * (p1.x - p0.x) / (p1.value - p0.value),
		// 						p0.y + (this.opts.isoValue - p0.value) * (p1.y - p0.y) / (p1.value - p0.value)
		// 					);
		// 					p.push(q);
		// 				}
		// 			}
		// 			this.contours.push(p);
		// 			// console.log(p);
		// 		}
		// 	}
		// }
	}

	public show(context: CanvasRenderingContext2D): void {
		// Draw contour lines
		context.strokeStyle = '#006699';
		context.lineWidth = 1;
		
		for (const c of this.contours) {
			context.moveTo(10 + c[0].x, 490 - c[0].y);
			for (let i = 1; i < c.length; i++) {
				context.lineTo(10 + c[i].x, 490 - c[i].y);
			}
			context.stroke();
		}
	}
}
