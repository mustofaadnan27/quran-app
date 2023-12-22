import CONFIG from "../globals/config";

const GeneralData = {
    endpoint: `${CONFIG.BASE_URL}/surat`,
    savedGettAll : null,
    
    async getAll() {
        if(this.savedGettAll) return this.savedGettAll;

        const options  = {};
        const request  = new Request(this.endpoint, options);
        const response = await fetch(request);
        const resJson  = await response.json();

        this.savedGettAll = resJson.data;

        return resJson.data;
    }
}

export default GeneralData