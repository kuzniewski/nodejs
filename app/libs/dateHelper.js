module.exports = {
	get: function()
	{
		var dt = new Date();
		var hora = ((dt.getHours() < 10) ? "0" : "") + dt.getHours();
		var minuto = ((dt.getMinutes() < 10) ? "0" : "") + dt.getMinutes();
		var segundo = ((dt.getSeconds() < 10) ? "0" : "") + dt.getSeconds();
		var dia = ((dt.getDate() < 10) ? "0" : "") + dt.getDate();
		var mes = dt.getMonth();
		var ano = dt.getFullYear();
		var month = new Array();
		month[0]="01";
		month[1]="02";
		month[2]="03";
		month[3]="04";
		month[4]="05";
		month[5]="06";
		month[6]="07";
		month[7]="08";
		month[8]="09";
		month[9]="10";
		month[10]="11";
		month[11]="12";
		mes = month[mes];

		return ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo;
	}
};