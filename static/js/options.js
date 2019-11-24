function openForm() { 
	document.getElementById("myForm").style.display = "block"; 
	speak_out(`Hi, I'am Keya. You can ask me to complete your payments/bills/recharges`);
}
function closeForm() { 
	document.getElementById("myForm").style.display = "none"; 
	speak_out(`You can come back to me at anytime.`);
}
// for(i in (data["BESCOM"])){ console.log(data["BESCOM"][i]);}
function selection(selected){
	if (selected in data){	
		for(i in data[selected]){
			var next_selected=(data[selected][i]).toString();
			$("#section").append("<button class='btn btn-default' onclick='selection(\""+next_selected+"\")'>"+next_selected+"</button>");
		}$("#section").append("<hr>");
	}
	else {msg=selected; $("#get_message").click();}
}

var flag=0;
function CRN(){
	$("#section").append("<p>Enter CRN or Customer ID</p>");x
	$("#section").append("<p>Enter Net Banking or MPIN(Mobile Banking PIN)</p>");
}
function Nickname(){
	$("#section").append("<p>Enter Nick Name</p>");
	$("#section").append("<p>Enter Net Banking or MPIN(Mobile Banking PIN)</p>");
}


function get_translated_lang(reply) {
	console.log(reply);
	$.ajax('/reply/'+reply,{
		type: 'GET',
		async: false,
        success: function (translated_text, status, xhr) {
        	console.log(translated_text);
        	speech.setLang('hi-IN');
        	$("#section").append(str(translated_text)+'<br>');
        	speak_out(translated_text);
        	return str(translated_text);
    	},
    	error: function(jqXhr, textStatus, errorMessage) {
    		console.log(msg);
    	}
	});
}

function print_out_lang(reply) {
	return get_translated_lang(reply);
	// $("#section").append('<p>'+translated_text+'</p');
}
function speak_out_lang(reply){
	get_translated_lang(reply);
	// speak_out(get_translated_lang(reply));
}

function textinputeval(){
	
	if ($('#msg').val()!='') {
		msg = $("#msg").val();
		$("#section").append('<p align="right">'+msg+'<img src="static/images/avtar.png" width="30px" height="30px"></p>');
		$('#msg').val('');
		$.ajax('/msg/'+msg,{
			type: 'GET',
			async: false,
	        success: function (language, status, xhr) {
	        	console.log(language);
	        	//other lang---
	        	if(language=='hi')
	        		speech.setLang('hi-IN');
	    	},
	    	error: function(jqXhr, textStatus, errorMessage) {
	    		console.log(msg);
	    	}
		});
	}
	for(i in service_values){
		var regex = new RegExp("[\\w ]*"+service_values[i]+"[\\w ]*","i");
		if(regex.test(msg)){
			msg = service_values[i];
			break;
		}
	}
	//Form filling
	if(msg in json || flag!=0 || msg in json){
		if(flag==0){
			flag=json[msg].length+1;
			message=json[msg];
		}
		if(flag==1){
			speak_out_lang("Please select one");
			$("#section").append('<button class="btn btn-default" value="CRN or Customer ID" onclick=CRN()>CRN or Customer ID</button>');
			$("#section").append('<button class="btn btn-default" value="CRN or Customer ID" onclick=Nickname()>Nick Name</button>');
		}
		else{
			print_out_lang('Registered:'+msg);
			// $("#section").append('<p>Registered: '+msg+'</p>');
			// $("#section").append('<p>'+print_out_lang('Registered:'+msg)+'</p>');
			$("#section").append('Send your '+message[message.length-flag+1]);
		}
		flag=flag-1;
	}
	else if (msg=="call us"||msg=="contact"||msg=="phone call"||msg.includes("call")){
		$("#section").append('<a href="tel:9391349353">+1 (303) 499-7111</a>');
		speak_out_lang(`you can call me by clicking on this phone number.`);
	}
	else if(/[\w ]*personal[\w ]*loan/.test(msg)){ 
		speak_out_lang(`we require listed to complete the process:`);
		personal_loan_req.map(print_out_lang);
		// $("#section").append('<ul><li>'+print_out_lang('Proof of Identity like Passport/ PAN Card, Aadhar card, Voter ID, Driving License')+'</li><li>'+print_out_lang('Proof of Residence like Utility Bill, Passport or Leave and License Agreement')+'</li><li>'+print_out_lang('Bank Statement for the last 3 months with income details')+'</li><li>'+print_out_lang('Salary slip for the last 3 months')+'</li><li>'+print_out_lang('2-3 Passport Size photographs')+'</li></ul>');
		//OK
		$("#section").append('<iframe width="100%" height="400px" src="https://rcasprod.kotak.com/personal-loan"></iframe>');
		speak_out_lang(`Personal loans are loans provided to salaried more than rupees 20000 per month for personal use. you must be active resident in the city for atleast an year`);
	}
	else if(/[\w ]*home[\w ]*loan/.test(msg)){
		speak_out_lang(`We require listed to complete the process:`);
		home_loan_req.map(print_out_lang);
		$("#section").append('<iframe width="100%" height="400px" src="https://rcasprod.kotak.com/home-loan"></iframe>');
		speak_out_lang(`salaried: age 18 to 60, minimum income rupees 20000 per month. If loan is for firm, firm must be at least 3 years old.`);
	}
	else if(/[\w ]*car[\w ]*loan/.test(msg)){
		speak_out_lang(`Eligibility criteria is as listed: `);
		car_loan_req.map(print_out_lang);
		$("#section").append('<iframe width="100%" height="400px" src="https://www.kotak.com/en/personal-banking/loans/car-loan/car-loan-apply-now.html"></iframe>');
	}
	else if(/[\w ]*childr?e?n?[\w ]*/.test(msg) || /[\w ]*mutual[\w ]*fund/.test(msg)){
		$("#section").append('<iframe width="100%" height="400px" src="https://www.kotak.com/en/personal-banking/investments/mutual-funds/apply-for-mutual-funds.html"></iframe>');			
	}
	else if(/[\w ]*junior[\w ]*acc?o?u?nt/.test(msg)){
		form = `<form action="/savingaccount/saveProspectInfoThirdParty.action" method="post" name="juniorAccform" id="juniorAccform" style="padding:30px">
					<select id="ProspectBasicInfo_TITLE" name="ProspectBasicInfo.TITLE" class="textfield2 form-control">
							<option value="-1">Select</option>
							<option value="Dr.">Dr.</option>
							<option value="Miss.">Miss.</option>
							<option value="Mr.">Mr.</option>
							<option value="Mrs.">Mrs.</option>
					</select>

					<input type="text" name="ProspectBasicInfo.FIRST_NAME" class="textfield1 form-control" id="ProspectBasicInfo_FIRST_NAME" title="Please enter your first name." onfocus="if(this.value=='First Name') {this.value='';}" onblur="if(this.value=='') {this.value = 'First Name';}" value="First Name" maxlength="20" autocomplete="off">
					<input type="text" name="ProspectBasicInfo.LAST_NAME" class="textfield1 form-control"id="ProspectBasicInfo_LAST_NAME" title="Please enter your last name." onfocus="if(this.value=='Last Name') {this.value='';}" onblur="if(this.value=='') {this.value = 'Last Name';}" value="Last Name" maxlength="20" autocomplete="off">
					<select name="ProspectBasicInfo.BRANCH_CITY" id="ProspectBasicInfo_BRANCH_CITY" class="textfield2 showBranch form-control">
					
					<option value="-1">Select Branch City</option><option value="576">Adoni</option><option value="178">Agartala</option><option value="2">Agra</option><option value="58">Ahmadnagar</option><option value="23">Ahmedabad</option><option value="149">Ajmer</option><option value="622">Ajnala</option><option value="553">Akbarpur</option><option value="796">Akola</option><option value="672">Algodu</option><option value="326">Alibag</option><option value="426">Aligarh</option><option value="150">Allahabad</option><option value="228">Alugunur</option><option value="481">Aluva</option><option value="415">Alwar</option><option value="710">Amalapuram</option><option value="792">Ambala</option><option value="151">Ambala Cantonment</option><option value="376">Ambikapur</option><option value="85">Amloh</option><option value="785">Amravati</option><option value="152">Amreli</option><option value="129">Amritsar</option><option value="713">Anakapalle</option><option value="3">Anand</option><option value="443">Anantapur</option><option value="59">Ankleshwar</option><option value="577">Annavaram</option><option value="381">Antapur</option><option value="232">Anugul</option><option value="86">Apra</option><option value="284">Arai</option><option value="306">Aran</option><option value="517">Armoor</option><option value="489">Asansol</option><option value="372">Ashok Nagar</option><option value="623">Assandh</option><option value="482">Atrauli</option><option value="87">Aurangabad</option><option value="366">Aurwad</option><option value="291">Avashi</option><option value="578">Avoor</option><option value="397">Azamgarh</option><option value="529">Azimgarh (Abohar)</option><option value="488">Baddi</option><option value="179">Badshahpur</option><option value="503">Bagalkot</option><option value="316">Bagauta</option><option value="509">Bagdal</option><option value="88">Bangalore</option><option value="579">Bangarpet</option><option value="154">Banswara</option><option value="367">Baramati</option><option value="399">Baran</option><option value="89">Baranada</option><option value="666">Barandur</option><option value="60">Barbil</option><option value="90">Bardoli</option><option value="130">Bareilly</option><option value="250">Barmer</option><option value="233">Barnala</option><option value="177">Baroda</option><option value="555">Basoda (M+OG)</option><option value="706">Bathinda</option><option value="234">Bavla</option><option value="725">Bazpur</option><option value="404">Beechhwal</option><option value="337">Begusarai</option><option value="24">Belgaum</option><option value="452">Bellary</option><option value="300">Bemetra</option><option value="435">Berhampur</option><option value="688">Bestawaripeta</option><option value="556">Betul (M+OG)</option><option value="392">Bhadohi</option><option value="775">Bhadravati</option><option value="624">Bhadson</option><option value="580">Bhagwanpur</option><option value="406">Bhagwanpur-Bihar</option><option value="343">Bhagwatipur</option><option value="625">Bhakarapet</option><option value="340">Bharuch</option><option value="380">Bhatapara</option><option value="61">Bhavnagar</option><option value="181">Bhilai Nagar</option><option value="155">Bhilwara</option><option value="727">Bhimavaram</option><option value="251">Bhinmal</option><option value="91">Bhiwadi</option><option value="665">Bhiwandi</option><option value="4">Bhopal</option><option value="114">Bhubaneswar</option><option value="183">Bhucho Mandi</option><option value="5">Bhuj</option><option value="62">Bidadi</option><option value="571">Bidar</option><option value="453">Bijapur</option><option value="235">Bijnor</option><option value="719">Bikaner</option><option value="115">Bilaspur</option><option value="763">Bilimora</option><option value="6">Bodeli</option><option value="275">Bopegaon</option><option value="736">Borsad</option><option value="184">Buja Buja Nellore</option><option value="581">Bukkapatnam</option><option value="185">Bundi</option><option value="47">Buti Bori</option><option value="570">Byadgi</option><option value="116">Chaibasa</option><option value="156">Chakan</option><option value="383">Chalisgaon</option><option value="626">Challakere</option><option value="273">Challakere (TMC)</option><option value="758">Chalwai</option><option value="280">Chandanpuri</option><option value="25">Chandigarh</option><option value="745">Changanassery</option><option value="26">Changodar</option><option value="288">Chaudhane</option><option value="318">Chauke</option><option value="742">Chavakkad</option><option value="63">Cheeka</option><option value="718">Chejerla</option><option value="582">Chelur</option><option value="186">Chenathur</option><option value="157">Chennai</option><option value="779">Cherukole</option><option value="454">Chickballapur</option><option value="455">Chickmagalur</option><option value="252">Chikhli</option><option value="187">Chikkagondakola</option><option value="236">Chinamiram</option><option value="663">Chintamani</option><option value="188">Chiplun</option><option value="730">Chirala</option><option value="490">Chitradurga</option><option value="189">Chittaurgarh</option><option value="575">Chittoor</option><option value="297">Chomu</option><option value="696">Chowdepalle</option><option value="530">Chuheki</option><option value="131">Coimbatore</option><option value="444">Cuddapah</option><option value="190">Cuttack</option><option value="64">Dahanu</option><option value="7">Dahod</option><option value="331">Dalan</option><option value="395">Danopur</option><option value="528">Dausa</option><option value="374">Davachwadi</option><option value="456">Davangere</option><option value="158">Deesa</option><option value="506">Degalmadi</option><option value="8">Dehradun</option><option value="312">Deulgaon Dhangar</option><option value="65">Dhanbad</option><option value="338">Dhar</option><option value="724">Dharampur</option><option value="759">Dharmasagar</option><option value="731">Dharmavaram</option><option value="298">Dharsania</option><option value="773">Dhenkanal</option><option value="772">Dhir</option><option value="237">Dhoraji</option><option value="787">Dhule</option><option value="627">Dhuri</option><option value="628">Dinanagar</option><option value="315">Dindori</option><option value="192">Diwakari</option><option value="279">Dixi</option><option value="531">Doraha</option><option value="512">Doultabad</option><option value="629">Duladi</option><option value="48">Duliajan</option><option value="769">Dumardaga - Booty More</option><option value="793">Dummy City</option><option value="741">Durgapur</option><option value="193">Edulapuram</option><option value="733">Eluru</option><option value="469">Erode</option><option value="66">Faridabad</option><option value="67">Fatehabad</option><option value="752">Fursungi</option><option value="711">G. Medapadu</option><option value="491">G.Kothapalli</option><option value="573">Gadag-Betigeri</option><option value="299">Gadarwara</option><option value="441">Gajuwaka</option><option value="518">Gandhari</option><option value="93">Gandhidham</option><option value="400">Ganganagar</option><option value="777">Gangawati</option><option value="325">Gangtok</option><option value="667">Gauribidanur</option><option value="780">Gaya</option><option value="9">Ghaziabad</option><option value="689">Giddaluru</option><option value="798">Goa</option><option value="630">Gobindgarh</option><option value="194">Gohana</option><option value="195">Gokhivare</option><option value="196">Gondal</option><option value="523">Gopalganj</option><option value="68">Gorakhpur</option><option value="375">Gorthan Bk.</option><option value="774">Gudiyatham</option><option value="457">Gulbarga</option><option value="355">Gunjalnagar</option><option value="442">Guntur</option><option value="344">Gunwadi</option><option value="10">Gurdaspur</option><option value="49">Gurgaon</option><option value="697">Gurramkonda</option><option value="686">Guthinadeevi</option><option value="94">Guwahati</option><option value="335">Gwalior</option><option value="569">Hagaribommanahalli</option><option value="197">Hajipur-Gujarat</option><option value="117">Hajira</option><option value="504">Halbarga</option><option value="783">Haldwani</option><option value="505">Hallur</option><option value="95">Halol</option><option value="360">Hamrapur</option><option value="238">Hansi</option><option value="673">Hanur</option><option value="560">Harangul</option><option value="401">Harda</option><option value="387">Haridwar</option><option value="661">Hassan</option><option value="532">Hazara</option><option value="583">Hemavathi</option><option value="378">Herwad</option><option value="69">Himmatnagar</option><option value="732">Hindupur</option><option value="767">Hiriyur</option><option value="385">Hisar</option><option value="584">Holagunda</option><option value="239">Hoshangabad</option><option value="782">Hoshiarpur</option><option value="458">Hospet</option><option value="470">Hosur</option><option value="96">Hubli</option><option value="702">Hubli-Dharwad</option><option value="28">Hunsimaranahalli</option><option value="674">Hunsur</option><option value="723">Huzurabad</option><option value="118">Hyderabad</option><option value="794">Ichalkaranji</option><option value="513">Ieeja</option><option value="499">Ilkal</option><option value="791">Indi</option><option value="159">Indore</option><option value="631">Indri</option><option value="508">Ingleswar</option><option value="332">Itarsi</option><option value="330">Jabalpur</option><option value="29">Jaipur</option><option value="519">Jakranpally</option><option value="533">Jalalabad</option><option value="30">Jalandhar</option><option value="97">Jalgaon</option><option value="266">Jalgaon (Nimbait) </option><option value="762">Jalna</option><option value="368">Jambhali</option><option value="199">Jammu</option><option value="31">Jamnagar</option><option value="32">Jamshedpur</option><option value="754">Javaranahalli </option><option value="534">Jawaharke (Mansa)</option><option value="240">Jaysigpur</option><option value="200">Jhalawar</option><option value="428">Jhansi</option><option value="253">Jharsuguda</option><option value="132">Joda</option><option value="133">Jodhpur</option><option value="11">Jorhat</option><option value="789">Jugsalai</option><option value="339">Junagadh</option><option value="585">Kadabagere</option><option value="70">Kadi</option><option value="586">Kadiramangalam </option><option value="587">Kadiri</option><option value="753">Kadodara</option><option value="668">Kadur</option><option value="445">Kakinada</option><option value="664">Kalher</option><option value="715">Kalikiri</option><option value="633">Kalol - Gandhi Nagar</option><option value="255">Kalol- Panchmahal</option><option value="520">Kamareddy</option><option value="272">Kambipura</option><option value="568">Kampli</option><option value="398">Kamrej</option><option value="703">Kancheepuram</option><option value="321">Kandach</option><option value="307">Kandar</option><option value="535">Kanganpur (Sirsa)</option><option value="588">Kanjikoil</option><option value="552">Kannauj</option><option value="269">Kannur</option><option value="12">Kanpur</option><option value="50">Kapurthala</option><option value="390">Karad</option><option value="287">Karanjad</option><option value="342">Karhati</option><option value="463">Karimnagar</option><option value="690">Karlapudi</option><option value="160">Karnal</option><option value="589">Karur</option><option value="379">Karve</option><option value="567">Karwar</option><option value="634">Kavali</option><option value="590">Keelakurichi</option><option value="135">Kelambakkam</option><option value="268">Khadak Malegaon</option><option value="377">Khadambe Kh.</option><option value="314">Khadambe Khurd</option><option value="256">Khairthal</option><option value="464">Khammam</option><option value="755">Khanapur</option><option value="257">Khandad</option><option value="492">Khandavalli</option><option value="201">Khanpur</option><option value="675">Kiragasuru</option><option value="98">Kochi</option><option value="635">Kodigenahalli</option><option value="271">Kokangaon</option><option value="460">Kolar</option><option value="99">Kolhapur</option><option value="100">Kolkata</option><option value="477">Kollam</option><option value="676">Kollegal</option><option value="591">Kondakamarla</option><option value="747">Kondakavuru</option><option value="684">Konijedu</option><option value="241">Konnagar</option><option value="350">Koste Bk</option><option value="345">Kota</option><option value="756">Kothagudem</option><option value="714">Kothavalasa</option><option value="267">Kothure</option><option value="536">Kotkapura</option><option value="33">Kottayam</option><option value="740">Kottiyam</option><option value="101">Kozhikode</option><option value="296">Kudal</option><option value="472">Kumbakonam</option><option value="636">Kunagalli</option><option value="659">Kurnool</option><option value="202">Kusumbe Khurd</option><option value="766">Ladwa</option><option value="203">Latur</option><option value="295">Lonavala</option><option value="102">Lucknow</option><option value="137">Ludhiana</option><option value="778">Machilipatnam</option><option value="446">Madanapalle</option><option value="341">Madanwadi</option><option value="103">Madhapur</option><option value="388">Madhubani</option><option value="51">Madipakkam</option><option value="52">Madurai</option><option value="501">Mahagaon</option><option value="592">Mahasamund</option><option value="46">Mahendra Garh</option><option value="549">Mahilpur (NP)</option><option value="637">Malewal</option><option value="537">Malout</option><option value="204">Mamidalapadu</option><option value="405">Mamoor Pur</option><option value="771">Mamun</option><option value="638">Manchenahalli</option><option value="511">Mancherial</option><option value="550">Mandi Dabwali (MC)</option><option value="258">Mandi Gobindgarh</option><option value="557">Mandideep (M)</option><option value="620">Mandya</option><option value="104">Manesar</option><option value="34">Mangalore</option><option value="311">Mangrur Nawghare</option><option value="411">Mapusa</option><option value="483">Maregowdanahalli</option><option value="72">Margao</option><option value="639">Mari Gaur Singh</option><option value="750">Markapur</option><option value="276">Materwadi</option><option value="138">Mathura</option><option value="270">Mauje Sukene</option><option value="303">Mayiladuthurai</option><option value="73">Meerut</option><option value="660">Mehaboobnagar</option><option value="640">Meharbanpur</option><option value="74">Mehesana</option><option value="677">Mercara</option><option value="386">Metoda</option><option value="391">Mettupalayam</option><option value="362">Mhalsakore</option><option value="359">Mhapan</option><option value="322">Mirjoli</option><option value="707">Miryalaguda</option><option value="641">Missarpura</option><option value="139">Modassa</option><option value="781">Moga</option><option value="13">Mohali</option><option value="310">Mohokhed</option><option value="35">Moradabad</option><option value="119">Morbi</option><option value="242">Mormugoa</option><option value="566">Motebennur</option><option value="521">Muchkur</option><option value="396">Mughalsarai</option><option value="538">Muktsar</option><option value="593">Mulbagal</option><option value="140">Mullanpur</option><option value="75">Mumbai</option><option value="565">Mundargi</option><option value="265">Mungase</option><option value="522">Mupkal</option><option value="748">Muppalla</option><option value="751">Muppavaram</option><option value="14">Muthangi</option><option value="429">Muzaffarnagar</option><option value="180">Muzaffarpur (JK)</option><option value="657">Muzaffarpur(Bihar)</option><option value="36">Mysore</option><option value="15">Nadiad</option><option value="678">Nagamangala</option><option value="243">Nagapur</option><option value="244">Nagaur</option><option value="120">Nagpur</option><option value="245">Naila Janjgir</option><option value="121">Nakodar</option><option value="559">Nalgonda</option><option value="594">Nallacheruvu</option><option value="76">Nallapadu</option><option value="16">Namakkal</option><option value="691">Nambur</option><option value="408">Nanded</option><option value="17">Nandelav</option><option value="692">Nandigama</option><option value="749">Nandivelugu</option><option value="370">Nandur Madhyameshwar</option><option value="361">Nandurdi</option><option value="708">Nandyal</option><option value="693">Narasaraopet</option><option value="277">Narayangaon</option><option value="162">Narendrapur (near Kolkatta)</option><option value="760">Narsampet</option><option value="37">Nashik</option><option value="205">Nathdwara</option><option value="38">Navi Mumbai</option><option value="122">Navsari</option><option value="417">Nawanshahar</option><option value="206">Neelagiri</option><option value="106">Neemrana</option><option value="447">Nellore</option><option value="308">Neri Bk</option><option value="107">New Delhi</option><option value="799">New Mumbai</option><option value="527">Newai-Tonk</option><option value="246">Nimbahera</option><option value="292">Nimbalak</option><option value="281">Niphad</option><option value="510">Nittur</option><option value="77">Niwai</option><option value="462">Nizamabad</option><option value="53">Noida</option><option value="448">Ongole</option><option value="669">P.Mahadevapura</option><option value="394">Padrauna</option><option value="683">Pakhoke</option><option value="539">Pakhowal</option><option value="493">Palacole</option><option value="744">Palai</option><option value="662">Palakkad</option><option value="643">Palamaner</option><option value="54">Palanpur</option><option value="402">Palda</option><option value="329">Paldhi Kh</option><option value="283">Palkhed</option><option value="55">Palsana</option><option value="484">Panaji</option><option value="540">Panchawali (Fazilka)</option><option value="40">Panchkula</option><option value="644">Pandori Gola</option><option value="351">Pandur</option><option value="207">Pangra</option><option value="123">Panipat</option><option value="41">Panjim</option><option value="739">Panmana</option><option value="320">Panvel</option><option value="698">Papanaidupet</option><option value="301">Paradip</option><option value="670">Parasu Ramapura</option><option value="687">Parvathipuram</option><option value="768">Pataliputra Housing Colony</option><option value="285">Patane</option><option value="478">Pathanamthitta</option><option value="595">Pathapalya</option><option value="42">Patiala</option><option value="56">Patna</option><option value="596">Pavagada</option><option value="382">Pawarwadi</option><option value="645">Pedanandipadu</option><option value="694">Pedaravuru</option><option value="761">Peddapendyala</option><option value="682">Pehowa</option><option value="208">Pen</option><option value="302">Pentapadu</option><option value="494">Penugonda</option><option value="597">Penukonda</option><option value="514">Perur</option><option value="290">Pezari</option><option value="163">Phagwara</option><option value="209">Pichandarkovil</option><option value="319">Pimpalgaon Baswant</option><option value="293">Pimpalgaon Malvi</option><option value="304">Pimpri Chinchwad</option><option value="210">Pipliyamandi</option><option value="141">Piplod</option><option value="211">Piprodakhurd</option><option value="317">Pokhardi</option><option value="259">Pollachi</option><option value="695">Ponnur</option><option value="621">Porumamilla</option><option value="212">Porur</option><option value="393">Pratapgarh</option><option value="449">Proddatur</option><option value="78">Puducherry</option><option value="346">Pudur</option><option value="264">Puna</option><option value="765">Pundri</option><option value="164">Pune</option><option value="646">Punganur</option><option value="373">Purar</option><option value="647">Qadian</option><option value="323">Rabod</option><option value="214">Radha Kishanpura</option><option value="574">Raichur</option><option value="407">Raigarh</option><option value="124">Raipur</option><option value="334">Raisen</option><option value="704">Rajahmundry</option><option value="215">Rajakhedi</option><option value="712">Rajam</option><option value="165">Rajkot</option><option value="108">Rajpura</option><option value="43">Rajsamand</option><option value="216">Ram Nagaria</option><option value="705">Ramachandrapuram</option><option value="699">Ramakuppam</option><option value="700">Ramasamudram</option><option value="541">Rampura Phul (Bhatinda)</option><option value="79">Ranchi</option><option value="648">Randhawa</option><option value="685">Rangapuram</option><option value="649">Ratia</option><option value="260">Ratnagiri</option><option value="558">Rau (NP)</option><option value="261">Rawatsar</option><option value="786">Rewari</option><option value="217">Ridmalsar Purohitan</option><option value="109">Rikhabhdeo</option><option value="790">Rishikesh</option><option value="166">Rohtak</option><option value="716">Rompicherla</option><option value="218">Roorkee</option><option value="167">Rourkela</option><option value="168">Rudrapur</option><option value="650">Rupnagar</option><option value="142">Sachin</option><option value="515">Sadashivpet</option><option value="313">Sagwan</option><option value="430">Saharanpur</option><option value="369">Sakegaon</option><option value="80">Salem</option><option value="651">Samana</option><option value="247">Samastipur</option><option value="436">Sambalpur</option><option value="542">Samrala</option><option value="219">Sanand</option><option value="305">Sangam</option><option value="561">Sangamner</option><option value="735">Sangli</option><option value="143">Sangrur</option><option value="169">Sankari</option><option value="220">Santokpura</option><option value="495">Saripalle</option><option value="170">Sarpavaram</option><option value="221">Sarra</option><option value="274">Satana</option><option value="409">Satara</option><option value="333">Sehore</option><option value="403">Seoni</option><option value="652">Shahbad</option><option value="548">Shahkot</option><option value="328">Shetphal</option><option value="44">Shillong</option><option value="784">Shimla</option><option value="459">Shimoga</option><option value="294">Shingawe</option><option value="363">Shirdhon</option><option value="309">Shirsoli</option><option value="222">Shivani</option><option value="282">Shivre</option><option value="757">Shivuni Palle</option><option value="788">Shobhagpura</option><option value="352">Shrirampur</option><option value="223">Shujalpur</option><option value="516">Siddipet</option><option value="171">Sidhpur</option><option value="543">Sikri</option><option value="371">Siliguri</option><option value="172">Silvassa</option><option value="364">Sindhnur</option><option value="653">Sirhind Fatehgarh Sahib</option><option value="564">Sirsi</option><option value="563">Siruguppa</option><option value="726">Sitarganj</option><option value="485">Sohana</option><option value="410">Solapur</option><option value="551">Sonbhadra</option><option value="598">Sondekoppa</option><option value="709">Sonipat</option><option value="125">Soyagaon</option><option value="728">Srikakulam</option><option value="717">Srikalahasti</option><option value="599">Srinivasapura</option><option value="770">Sujanpur</option><option value="507">Sulehpeth</option><option value="546">Sultanpur Lodhi</option><option value="224">Sumerpur</option><option value="486">Surajpur</option><option value="144">Surat</option><option value="126">Surendranagar</option><option value="722">Sydapur</option><option value="681">T.Narasipur</option><option value="502">Tadavalga</option><option value="734">Tadepalligudem</option><option value="358">Talashet</option><option value="679">Talkad</option><option value="547">Talwandi Bhai</option><option value="500">Tamba</option><option value="496">Tanuku</option><option value="173">Tarapur</option><option value="225">Tarshali</option><option value="327">Tehare</option><option value="226">Tembhurni</option><option value="746">Tenali</option><option value="654">Thakarpur</option><option value="262">Thandalam</option><option value="680">Thandavapura</option><option value="324">Thane</option><option value="701">Thanjavur</option><option value="286">Thengode</option><option value="227">Thippasandra</option><option value="467">Thiruchirapalli</option><option value="738">Thirupuram</option><option value="248">Thiruvalla</option><option value="45">Thiruvananthapuram</option><option value="737">Thodupuzha</option><option value="176">Thrissur</option><option value="671">Tiptur</option><option value="795">Tirunelveli</option><option value="450">Tirupathi</option><option value="81">Tirupur</option><option value="479">Tirur</option><option value="743">Tiruvannamalai</option><option value="473">Tiruvottiyur</option><option value="278">Tisgaon</option><option value="764">Tohana</option><option value="19">Trichy</option><option value="461">Tumkur</option><option value="82">Udaipur</option><option value="776">Udupi</option><option value="487">Ujjain</option><option value="289">Umroli</option><option value="145">Unjha</option><option value="721">Uppal</option><option value="562">Uppin Betagri</option><option value="480">Vadakara</option><option value="111">Vadodara</option><option value="146">Vallabh Vidyanagar</option><option value="20">Valsad</option><option value="384">Vanvadi</option><option value="147">Vapi</option><option value="174">Varanasi</option><option value="354">Varhane</option><option value="112">Vasai</option><option value="476">Vedapatti</option><option value="475">Vellore</option><option value="230">Vengikkal</option><option value="797">Veraval</option><option value="600">Vijayapura</option><option value="113">Vijayawada</option><option value="263">Villupuram</option><option value="21">Viramgam</option><option value="148">Virar</option><option value="440">Vishakapatnam</option><option value="84">Visnagar</option><option value="497">Vissakoderu</option><option value="729">Vizianagaram</option><option value="127">Vyara</option><option value="231">Waluj</option><option value="128">Warangal</option><option value="498">West Vipparru</option><option value="656">Yamunanagar</option><option value="720">Yelakaturthy</option><option value="601">Yenumala Palle</option><option value="175">Zirakpur</option></select>													

					<br><input type="text" name="ProspectBasicInfo.TEL_STD" class="textfield_phone" id="ProspectBasicInfo_TEL_STD" onfocus="if (this.value=='STD')this.value=''" onblur="if (this.value=='')this.value='STD'" value="STD" maxlength="5" autocomplete="off">
					<input type="text" name="ProspectBasicInfo.TEL_NO" class="textfield_phone_no" id="ProspectBasicInfo_TEL_NO" value="Enter your Phone" onfocus="if (this.value=='Enter your Phone')this.value=''" onblur="if (this.value=='')this.value='Enter your Phone'" maxlength="10" autocomplete="off"></td>
													
					<input type="text" name="ProspectBasicInfo.MOBILE_NO" class="textfield1 form-control" id="ProspectBasicInfo_MOBILE_NO" title="Please enter your mobile no." onfocus="if(this.value=='Mobile No.') {this.value='';}" onblur="if(this.value=='') {this.value = 'Mobile No.';}" value="Mobile No." maxlength="10" autocomplete="off">
					<input type="text" name="ProspectBasicInfo.EMAIL" class="textfield1 form-control" id="ProspectBasicInfo_EMAIL" title="Please enter your email id." onfocus="if(this.value=='Email') {this.value='';}" onblur="if(this.value=='') {this.value = 'Email';}" value="Email" maxlength="60" autocomplete="off">
					
					<input type="checkbox" name="basicInfoAccptTnC" value="Y" checked="" class="form-checkbox" id="termscondition"> <a href="http://www.kotak.com/bank/terms-and-conditions/terms_1.htm" target="_blank">T&C</a>
											
					<input type="submit" id="submit" class="btn btn-default">					
				</form>`
		$("#section").append(form);	
		// $("#section").append('<iframe width="100%" height="400px" src="https://apply.kotak.com/savingaccount/banners/JuniorAccount/index.html"></iframe>');			
		speak_out_lang(`Kotak bank is the only bank which offers 6 per cent per annum on the Kotak Junior account. There is also an option of 10 year Recurring Deposit and linked Systematic Investment Plans intended to provide long-term savings for your child with a Junior ID card.`);
	}
	// else if(msg=="recurring deposits" || msg=="senior citizen fixed deposit" || msg=="tax saving fixed deposit"){
	// 	$("#section").append('<iframe width="100%" height="400px" src="https://apply.kotak.com/savingaccount/rihome/home.action"></iframe>');			
	// }
	else if(/[\w ]*credit[\w ]*card/.test(msg)){
		speak_out_lang("Start applying for your credit card");
		$("#section").append('<iframe width="100%" height="400px" src="https://rcasprod.kotak.com/credit-card"></iframe>');			
	}
	// else if(msg=="life insurance"){
	// 	$("#section").append('<iframe width="100%" height="400px" src="https://www.kotak.com/en/personal-banking/insurance/life-insurance/apply-for-life-insurance.html"></iframe>');			
	// }
	else if(msg=="Level 1"){
		//ur code
	}
	else if(msg=="Level 2"){
		//ur code
	}
	else if(msg=="Level 3"){
		//window.open('mailto:test@example.com?subject=subject&body=body');
		//ur code
	}
	else if(msg=="Level 4"){
		//ur code
	}
	else{
		print_out_lang("<p>Sorry, this sentence is a little out for me to understand</p>");
	}
}

function voiceinputeval(){
	speechRec.start();
}