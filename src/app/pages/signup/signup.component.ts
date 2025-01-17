import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['+33', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
      country: ['', Validators.required]
    }, { validator: this.passwordCheck });
  }


  passwordCheck(group: FormGroup) {
    let pass1 = group.controls.password.value;
    let pass2 = group.controls.password2.value;

    return pass1 === pass2 ? null : { notSame: true };
  }

  async attemptSignup() {
    await this.userService.signUp(this.form.value).toPromise().then((user)=> {
      localStorage.setItem('token', user.token);
      this.userService.setAuth(user)
    });
    this.router.navigate(['/payments']);
  }
  countries = [
    { code: 'AF', value: 'Afghanistan' },
    { code: 'AX', value: 'Aland Islands' },
    { code: 'AL', value: 'Albania' },
    { code: 'DZ', value: 'Algeria' },
    { code: 'AS', value: 'American Samoa' },
    { code: 'AD', value: 'Andorra' },
    { code: 'AO', value: 'Angola' },
    { code: 'AI', value: 'Anguilla' },
    { code: 'AQ', value: 'Antarctica' },
    { code: 'AG', value: 'Antigua And Barbuda' },
    { code: 'AR', value: 'Argentina' },
    { code: 'AM', value: 'Armenia' },
    { code: 'AW', value: 'Aruba' },
    { code: 'AU', value: 'Australia' },
    { code: 'AT', value: 'Austria' },
    { code: 'AZ', value: 'Azerbaijan' },
    { code: 'BS', value: 'Bahamas' },
    { code: 'BH', value: 'Bahrain' },
    { code: 'BD', value: 'Bangladesh' },
    { code: 'BB', value: 'Barbados' },
    { code: 'BY', value: 'Belarus' },
    { code: 'BE', value: 'Belgium' },
    { code: 'BZ', value: 'Belize' },
    { code: 'BJ', value: 'Benin' },
    { code: 'BM', value: 'Bermuda' },
    { code: 'BT', value: 'Bhutan' },
    { code: 'BO', value: 'Bolivia' },
    { code: 'BA', value: 'Bosnia And Herzegovina' },
    { code: 'BW', value: 'Botswana' },
    { code: 'BV', value: 'Bouvet Island' },
    { code: 'BR', value: 'Brazil' },
    { code: 'IO', value: 'British Indian Ocean Territory' },
    { code: 'BN', value: 'Brunei Darussalam' },
    { code: 'BG', value: 'Bulgaria' },
    { code: 'BF', value: 'Burkina Faso' },
    { code: 'BI', value: 'Burundi' },
    { code: 'KH', value: 'Cambodia' },
    { code: 'CM', value: 'Cameroon' },
    { code: 'CA', value: 'Canada' },
    { code: 'CV', value: 'Cape Verde' },
    { code: 'KY', value: 'Cayman Islands' },
    { code: 'CF', value: 'Central African Republic' },
    { code: 'TD', value: 'Chad' },
    { code: 'CL', value: 'Chile' },
    { code: 'CN', value: 'China' },
    { code: 'CX', value: 'Christmas Island' },
    { code: 'CC', value: 'Cocos (Keeling) Islands' },
    { code: 'CO', value: 'Colombia' },
    { code: 'KM', value: 'Comoros' },
    { code: 'CG', value: 'Congo' },
    { code: 'CD', value: 'Congo}, Democratic Republic' },
    { code: 'CK', value: 'Cook Islands' },
    { code: 'CR', value: 'Costa Rica' },
    { code: 'CI', value: 'Cote D\'Ivoire' },
    { code: 'HR', value: 'Croatia' },
    { code: 'CU', value: 'Cuba' },
    { code: 'CY', value: 'Cyprus' },
    { code: 'CZ', value: 'Czech Republic' },
    { code: 'DK', value: 'Denmark' },
    { code: 'DJ', value: 'Djibouti' },
    { code: 'DM', value: 'Dominica' },
    { code: 'DO', value: 'Dominican Republic' },
    { code: 'EC', value: 'Ecuador' },
    { code: 'EG', value: 'Egypt' },
    { code: 'SV', value: 'El Salvador' },
    { code: 'GQ', value: 'Equatorial Guinea' },
    { code: 'ER', value: 'Eritrea' },
    { code: 'EE', value: 'Estonia' },
    { code: 'ET', value: 'Ethiopia' },
    { code: 'FK', value: 'Falkland Islands (Malvinas)' },
    { code: 'FO', value: 'Faroe Islands' },
    { code: 'FJ', value: 'Fiji' },
    { code: 'FI', value: 'Finland' },
    { code: 'FR', value: 'France' },
    { code: 'GF', value: 'French Guiana' },
    { code: 'PF', value: 'French Polynesia' },
    { code: 'TF', value: 'French Southern Territories' },
    { code: 'GA', value: 'Gabon' },
    { code: 'GM', value: 'Gambia' },
    { code: 'GE', value: 'Georgia' },
    { code: 'DE', value: 'Germany' },
    { code: 'GH', value: 'Ghana' },
    { code: 'GI', value: 'Gibraltar' },
    { code: 'GR', value: 'Greece' },
    { code: 'GL', value: 'Greenland' },
    { code: 'GD', value: 'Grenada' },
    { code: 'GP', value: 'Guadeloupe' },
    { code: 'GU', value: 'Guam' },
    { code: 'GT', value: 'Guatemala' },
    { code: 'GG', value: 'Guernsey' },
    { code: 'GN', value: 'Guinea' },
    { code: 'GW', value: 'Guinea-Bissau' },
    { code: 'GY', value: 'Guyana' },
    { code: 'HT', value: 'Haiti' },
    { code: 'HM', value: 'Heard Island & Mcdonald Islands' },
    { code: 'VA', value: 'Holy See (Vatican City State)' },
    { code: 'HN', value: 'Honduras' },
    { code: 'HK', value: 'Hong Kong' },
    { code: 'HU', value: 'Hungary' },
    { code: 'IS', value: 'Iceland' },
    { code: 'IN', value: 'India' },
    { code: 'ID', value: 'Indonesia' },
    { code: 'IR', value: 'Iran}, Islamic Republic Of' },
    { code: 'IQ', value: 'Iraq' },
    { code: 'IE', value: 'Ireland' },
    { code: 'IM', value: 'Isle Of Man' },
    { code: 'IL', value: 'Israel' },
    { code: 'IT', value: 'Italy' },
    { code: 'JM', value: 'Jamaica' },
    { code: 'JP', value: 'Japan' },
    { code: 'JE', value: 'Jersey' },
    { code: 'JO', value: 'Jordan' },
    { code: 'KZ', value: 'Kazakhstan' },
    { code: 'KE', value: 'Kenya' },
    { code: 'KI', value: 'Kiribati' },
    { code: 'KR', value: 'Korea' },
    { code: 'KW', value: 'Kuwait' },
    { code: 'KG', value: 'Kyrgyzstan' },
    { code: 'LA', value: 'Lao People\'s Democratic Republic' },
    { code: 'LV', value: 'Latvia' },
    { code: 'LB', value: 'Lebanon' },
    { code: 'LS', value: 'Lesotho' },
    { code: 'LR', value: 'Liberia' },
    { code: 'LY', value: 'Libyan Arab Jamahiriya' },
    { code: 'LI', value: 'Liechtenstein' },
    { code: 'LT', value: 'Lithuania' },
    { code: 'LU', value: 'Luxembourg' },
    { code: 'MO', value: 'Macao' },
    { code: 'MK', value: 'Macedonia' },
    { code: 'MG', value: 'Madagascar' },
    { code: 'MW', value: 'Malawi' },
    { code: 'MY', value: 'Malaysia' },
    { code: 'MV', value: 'Maldives' },
    { code: 'ML', value: 'Mali' },
    { code: 'MT', value: 'Malta' },
    { code: 'MH', value: 'Marshall Islands' },
    { code: 'MQ', value: 'Martinique' },
    { code: 'MR', value: 'Mauritania' },
    { code: 'MU', value: 'Mauritius' },
    { code: 'YT', value: 'Mayotte' },
    { code: 'MX', value: 'Mexico' },
    { code: 'FM', value: 'Micronesia Federated States Of' },
    { code: 'MD', value: 'Moldova' },
    { code: 'MC', value: 'Monaco' },
    { code: 'MN', value: 'Mongolia' },
    { code: 'ME', value: 'Montenegro' },
    { code: 'MS', value: 'Montserrat' },
    { code: 'MA', value: 'Morocco' },
    { code: 'MZ', value: 'Mozambique' },
    { code: 'MM', value: 'Myanmar' },
    { code: 'NA', value: 'Namibia' },
    { code: 'NR', value: 'Nauru' },
    { code: 'NP', value: 'Nepal' },
    { code: 'NL', value: 'Netherlands' },
    { code: 'AN', value: 'Netherlands Antilles' },
    { code: 'NC', value: 'New Caledonia' },
    { code: 'NZ', value: 'New Zealand' },
    { code: 'NI', value: 'Nicaragua' },
    { code: 'NE', value: 'Niger' },
    { code: 'NG', value: 'Nigeria' },
    { code: 'NU', value: 'Niue' },
    { code: 'NF', value: 'Norfolk Island' },
    { code: 'MP', value: 'Northern Mariana Islands' },
    { code: 'NO', value: 'Norway' },
    { code: 'OM', value: 'Oman' },
    { code: 'PK', value: 'Pakistan' },
    { code: 'PW', value: 'Palau' },
    { code: 'PS', value: 'Palestinian Territory}, Occupied' },
    { code: 'PA', value: 'Panama' },
    { code: 'PG', value: 'Papua New Guinea' },
    { code: 'PY', value: 'Paraguay' },
    { code: 'PE', value: 'Peru' },
    { code: 'PH', value: 'Philippines' },
    { code: 'PN', value: 'Pitcairn' },
    { code: 'PL', value: 'Poland' },
    { code: 'PT', value: 'Portugal' },
    { code: 'PR', value: 'Puerto Rico' },
    { code: 'QA', value: 'Qatar' },
    { code: 'RE', value: 'Reunion' },
    { code: 'RO', value: 'Romania' },
    { code: 'RU', value: 'Russian Federation' },
    { code: 'RW', value: 'Rwanda' },
    { code: 'BL', value: 'Saint Barthelemy' },
    { code: 'SH', value: 'Saint Helena' },
    { code: 'KN', value: 'Saint Kitts And Nevis' },
    { code: 'LC', value: 'Saint Lucia' },
    { code: 'MF', value: 'Saint Martin' },
    { code: 'PM', value: 'Saint Pierre And Miquelon' },
    { code: 'VC', value: 'Saint Vincent And Grenadines' },
    { code: 'WS', value: 'Samoa' },
    { code: 'SM', value: 'San Marino' },
    { code: 'ST', value: 'Sao Tome And Principe' },
    { code: 'SA', value: 'Saudi Arabia' },
    { code: 'SN', value: 'Senegal' },
    { code: 'RS', value: 'Serbia' },
    { code: 'SC', value: 'Seychelles' },
    { code: 'SL', value: 'Sierra Leone' },
    { code: 'SG', value: 'Singapore' },
    { code: 'SK', value: 'Slovakia' },
    { code: 'SI', value: 'Slovenia' },
    { code: 'SB', value: 'Solomon Islands' },
    { code: 'SO', value: 'Somalia' },
    { code: 'ZA', value: 'South Africa' },
    { code: 'GS', value: 'South Georgia And Sandwich Isl.' },
    { code: 'ES', value: 'Spain' },
    { code: 'LK', value: 'Sri Lanka' },
    { code: 'SD', value: 'Sudan' },
    { code: 'SR', value: 'Suriname' },
    { code: 'SJ', value: 'Svalbard And Jan Mayen' },
    { code: 'SZ', value: 'Swaziland' },
    { code: 'SE', value: 'Sweden' },
    { code: 'CH', value: 'Switzerland' },
    { code: 'SY', value: 'Syrian Arab Republic' },
    { code: 'TW', value: 'Taiwan' },
    { code: 'TJ', value: 'Tajikistan' },
    { code: 'TZ', value: 'Tanzania' },
    { code: 'TH', value: 'Thailand' },
    { code: 'TL', value: 'Timor-Leste' },
    { code: 'TG', value: 'Togo' },
    { code: 'TK', value: 'Tokelau' },
    { code: 'TO', value: 'Tonga' },
    { code: 'TT', value: 'Trinidad And Tobago' },
    { code: 'TN', value: 'Tunisia' },
    { code: 'TR', value: 'Turkey' },
    { code: 'TM', value: 'Turkmenistan' },
    { code: 'TC', value: 'Turks And Caicos Islands' },
    { code: 'TV', value: 'Tuvalu' },
    { code: 'UG', value: 'Uganda' },
    { code: 'UA', value: 'Ukraine' },
    { code: 'AE', value: 'United Arab Emirates' },
    { code: 'GB', value: 'United Kingdom' },
    { code: 'US', value: 'United States' },
    { code: 'UM', value: 'United States Outlying Islands' },
    { code: 'UY', value: 'Uruguay' },
    { code: 'UZ', value: 'Uzbekistan' },
    { code: 'VU', value: 'Vanuatu' },
    { code: 'VE', value: 'Venezuela' },
    { code: 'VN', value: 'Viet Nam' },
    { code: 'VG', value: 'Virgin Islands British' },
    { code: 'VI', value: 'Virgin Islands U.S.' },
    { code: 'WF', value: 'Wallis And Futuna' },
    { code: 'EH', value: 'Western Sahara' },
    { code: 'YE', value: 'Yemen' },
    { code: 'ZM', value: 'Zambia' },
  ];


  get password() {
    return this.form.get('password');
  }
  get password2() {
    return this.form.get('password2');
  }
  get email() {
    return this.form.get('email')
  }
  get firstname() { return this.form.get('firstname') }
  get lastname() { return this.form.get('lastname') }
  get phone() { return this.form.get('phone') }
}
