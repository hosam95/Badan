import path from "path";

export function imgNameGen(imgName:string) {
	return new Date().getTime() + "_" + "_" + imgName;
}

export function imgPathGen(directory:any, imgName:string) {
	return path.join(process.cwd(), directory + `${imgName}`);
}


