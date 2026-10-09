import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// 01: Electrical Installations & Repairs (COC's)
export function ElectricalSvg({ className = "w-16 h-12 object-contain", ...props }: SvgProps) {
  return (
    <svg
      aria-label="Dynamic Handyman Electrical Service Icon"
      className={className}
      fill="none"
      role="img"
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" stroke="#123E61" strokeLinecap="square" strokeLinejoin="round" strokeWidth="4">
        <path d="M160 24 L282 120 L160 216 L38 120 Z" />
        <path d="M124 0 L196 56" />
        <path d="M196 0 L124 56" />
        <path d="M0 90 L76 150" />
        <path d="M0 150 L76 90" />
        <path d="M244 90 L320 150" />
        <path d="M244 150 L320 90" />
        <path d="M124 184 L196 240" />
        <path d="M196 184 L124 240" />
      </g>
      <g fill="#19547E" opacity=".42">
        <circle cx="92" cy="55" r="2.5" />
        <circle cx="112" cy="55" r="2.5" />
        <circle cx="208" cy="55" r="2.5" />
        <circle cx="228" cy="55" r="2.5" />
        <circle cx="66" cy="76" r="2.5" />
        <circle cx="88" cy="76" r="2.5" />
        <circle cx="232" cy="76" r="2.5" />
        <circle cx="254" cy="76" r="2.5" />
        <circle cx="44" cy="98" r="2.5" />
        <circle cx="66" cy="98" r="2.5" />
        <circle cx="254" cy="98" r="2.5" />
        <circle cx="276" cy="98" r="2.5" />
        <circle cx="44" cy="142" r="2.5" />
        <circle cx="66" cy="142" r="2.5" />
        <circle cx="254" cy="142" r="2.5" />
        <circle cx="276" cy="142" r="2.5" />
        <circle cx="66" cy="164" r="2.5" />
        <circle cx="88" cy="164" r="2.5" />
        <circle cx="232" cy="164" r="2.5" />
        <circle cx="254" cy="164" r="2.5" />
        <circle cx="92" cy="185" r="2.5" />
        <circle cx="112" cy="185" r="2.5" />
        <circle cx="208" cy="185" r="2.5" />
        <circle cx="228" cy="185" r="2.5" />
      </g>
      <g fill="#123E61">
        <rect height="28" rx="4" width="11" x="132" y="72" />
        <rect height="28" rx="4" width="11" x="177" y="72" />
        <path d="M120 94 H200 V126 C200 148 183 165 161 165 H159 C137 165 120 148 120 126 Z" />
        <rect height="27" rx="6" width="14" x="153" y="158" />
        <path d="M160 178 C160 196 176 199 187 199 H202 V211 H186 C163 211 148 199 148 179 Z" />
        <path d="M165 104 L143 135 H157 L151 154 L178 121 H164 L173 104 Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

// 02: Painting (Interior • Exterior • Roofs)
export function PaintingSvg({ className = "w-16 h-12 object-contain", ...props }: SvgProps) {
  return (
    <svg
      aria-label="Dynamic Handyman Painting Service Icon"
      className={className}
      role="img"
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" stroke="#123E61" strokeLinecap="square" strokeLinejoin="round" strokeWidth="4">
        <path d="M160 24 L282 120 L160 216 L38 120 Z" />
        <path d="M124 0 L196 56" />
        <path d="M196 0 L124 56" />
        <path d="M0 90 L76 150" />
        <path d="M0 150 L76 90" />
        <path d="M244 90 L320 150" />
        <path d="M244 150 L320 90" />
        <path d="M124 184 L196 240" />
        <path d="M196 184 L124 240" />
      </g>
      <g fill="#19547E" opacity=".42">
        <circle cx="92" cy="55" r="2.5" />
        <circle cx="112" cy="55" r="2.5" />
        <circle cx="208" cy="55" r="2.5" />
        <circle cx="228" cy="55" r="2.5" />
        <circle cx="66" cy="76" r="2.5" />
        <circle cx="88" cy="76" r="2.5" />
        <circle cx="232" cy="76" r="2.5" />
        <circle cx="254" cy="76" r="2.5" />
        <circle cx="44" cy="98" r="2.5" />
        <circle cx="66" cy="98" r="2.5" />
        <circle cx="254" cy="98" r="2.5" />
        <circle cx="276" cy="98" r="2.5" />
        <circle cx="44" cy="142" r="2.5" />
        <circle cx="66" cy="142" r="2.5" />
        <circle cx="254" cy="142" r="2.5" />
        <circle cx="276" cy="142" r="2.5" />
        <circle cx="66" cy="164" r="2.5" />
        <circle cx="88" cy="164" r="2.5" />
        <circle cx="232" cy="164" r="2.5" />
        <circle cx="254" cy="164" r="2.5" />
        <circle cx="92" cy="185" r="2.5" />
        <circle cx="112" cy="185" r="2.5" />
        <circle cx="208" cy="185" r="2.5" />
        <circle cx="228" cy="185" r="2.5" />
      </g>
      <g fill="#123E61">
        <rect height="36" rx="9" width="108" x="102" y="72" />
        <rect height="39" rx="6" width="12" x="194" y="88" />
        <path d="M200 116 L164 124 Q154 126 154 137 L154 151 L166 151 L166 139 Q166 135 172 134 L204 127 Z" />
        <rect height="50" rx="7" width="22" x="149" y="145" />
        <path d="M119 118 C119 118 106 140 106 150 C106 160 112 166 120 166 C128 166 134 160 134 150 C134 140 119 118 119 118 Z" />
        <path d="M145 120 C145 120 137 134 137 141 C137 148 141 152 146 152 C151 152 155 148 155 141 C155 134 145 120 145 120 Z" />
      </g>
    </svg>
  );
}

// 03: Carpentry (Built-in Cupboards • Ceilings • Doors • Skirting)
export function CarpentrySvg({ className = "w-16 h-12 object-contain", ...props }: SvgProps) {
  return (
    <svg
      aria-label="Dynamic Handyman Carpentry Service Icon"
      className={className}
      role="img"
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" stroke="#123E61" strokeLinecap="square" strokeLinejoin="round" strokeWidth="4">
        <path d="M160 24 L282 120 L160 216 L38 120 Z" />
        <path d="M124 0 L196 56" />
        <path d="M196 0 L124 56" />
        <path d="M0 90 L76 150" />
        <path d="M0 150 L76 90" />
        <path d="M244 90 L320 150" />
        <path d="M244 150 L320 90" />
        <path d="M124 184 L196 240" />
        <path d="M196 184 L124 240" />
      </g>
      <g fill="#19547E" opacity=".42">
        <circle cx="92" cy="55" r="2.5" />
        <circle cx="112" cy="55" r="2.5" />
        <circle cx="208" cy="55" r="2.5" />
        <circle cx="228" cy="55" r="2.5" />
        <circle cx="66" cy="76" r="2.5" />
        <circle cx="88" cy="76" r="2.5" />
        <circle cx="232" cy="76" r="2.5" />
        <circle cx="254" cy="76" r="2.5" />
        <circle cx="44" cy="98" r="2.5" />
        <circle cx="66" cy="98" r="2.5" />
        <circle cx="254" cy="98" r="2.5" />
        <circle cx="276" cy="98" r="2.5" />
        <circle cx="44" cy="142" r="2.5" />
        <circle cx="66" cy="142" r="2.5" />
        <circle cx="254" cy="142" r="2.5" />
        <circle cx="276" cy="142" r="2.5" />
        <circle cx="66" cy="164" r="2.5" />
        <circle cx="88" cy="164" r="2.5" />
        <circle cx="232" cy="164" r="2.5" />
        <circle cx="254" cy="164" r="2.5" />
        <circle cx="92" cy="185" r="2.5" />
        <circle cx="112" cy="185" r="2.5" />
        <circle cx="208" cy="185" r="2.5" />
        <circle cx="228" cy="185" r="2.5" />
      </g>
      <g fill="#123E61">
        <rect height="15" rx="2" width="65" x="154" y="117" />
        <rect height="15" rx="2" width="65" x="154" y="138" />
        <rect height="15" rx="2" width="65" x="154" y="159" />
        <circle cx="207" cy="124.5" fill="#FFFFFF" r="3" />
        <circle cx="199" cy="145.5" fill="#FFFFFF" r="3" />
        <circle cx="209" cy="166.5" fill="#FFFFFF" r="3" />
        <path d="M91 92 L105 78 L137 91 L148 102 L136 114 L124 103 L113 104 Z" />
        <path d="M103 79 L119 68 L130 73 L120 82 L136 88 L129 96 Z" />
        <path d="M126 103 L139 109 L113 169 Q110 176 103 173 L97 170 Q91 167 95 160 Z" />
      </g>
    </svg>
  );
}

// 04: Plumbing
export function PlumbingSvg({ className = "w-16 h-12 object-contain", ...props }: SvgProps) {
  return (
    <svg
      aria-label="Dynamic Handyman Plumbing Service Icon"
      className={className}
      role="img"
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" stroke="#123E61" strokeLinecap="square" strokeLinejoin="round" strokeWidth="4">
        <path d="M160 24 L282 120 L160 216 L38 120 Z" />
        <path d="M124 0 L196 56" />
        <path d="M196 0 L124 56" />
        <path d="M0 90 L76 150" />
        <path d="M0 150 L76 90" />
        <path d="M244 90 L320 150" />
        <path d="M244 150 L320 90" />
        <path d="M124 184 L196 240" />
        <path d="M196 184 L124 240" />
      </g>
      <g fill="#19547E" opacity=".42">
        <circle cx="92" cy="55" r="2.5" />
        <circle cx="112" cy="55" r="2.5" />
        <circle cx="208" cy="55" r="2.5" />
        <circle cx="228" cy="55" r="2.5" />
        <circle cx="66" cy="76" r="2.5" />
        <circle cx="88" cy="76" r="2.5" />
        <circle cx="232" cy="76" r="2.5" />
        <circle cx="254" cy="76" r="2.5" />
        <circle cx="44" cy="98" r="2.5" />
        <circle cx="66" cy="98" r="2.5" />
        <circle cx="254" cy="98" r="2.5" />
        <circle cx="276" cy="98" r="2.5" />
        <circle cx="44" cy="142" r="2.5" />
        <circle cx="66" cy="142" r="2.5" />
        <circle cx="254" cy="142" r="2.5" />
        <circle cx="276" cy="142" r="2.5" />
        <circle cx="66" cy="164" r="2.5" />
        <circle cx="88" cy="164" r="2.5" />
        <circle cx="232" cy="164" r="2.5" />
        <circle cx="254" cy="164" r="2.5" />
        <circle cx="92" cy="185" r="2.5" />
        <circle cx="112" cy="185" r="2.5" />
        <circle cx="208" cy="185" r="2.5" />
        <circle cx="228" cy="185" r="2.5" />
      </g>
      <g fill="#123E61">
        <rect height="13" rx="6.5" width="68" x="126" y="70" />
        <circle cx="160" cy="76.5" r="15" />
        <rect height="16" rx="2" width="10" x="155" y="82" />
        <rect height="10" rx="4" width="34" x="143" y="94" />
        <rect height="25" rx="6" width="82" x="101" y="111" />
        <rect height="41" rx="5" width="15" x="89" y="103" />
        <rect height="55" rx="4" width="12" x="80" y="96" />
        <circle cx="157" cy="123.5" r="25" />
        <path d="M169 111 H205 C224 111 236 124 236 143 V157 H220 V144 C220 134 214 128 204 128 H169 Z" />
        <rect height="8" rx="3" width="22" x="217" y="153" />
        <path d="M228 166 C228 166 215 186 215 197 C215 208 221 215 229 215 C238 215 244 208 244 197 C244 186 228 166 228 166 Z" />
      </g>
    </svg>
  );
}

// 05: Palisades & Carports
export function PalisadesCarportsSvg({ className = "w-16 h-12 object-contain", ...props }: SvgProps) {
  return (
    <svg
      aria-label="Dynamic Handyman Palisades and Carports Service Icon"
      className={className}
      fill="none"
      role="img"
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" stroke="#123E61" strokeLinecap="square" strokeLinejoin="round" strokeWidth="4">
        <path d="M160 24 L282 120 L160 216 L38 120 Z" />
        <path d="M124 0 L196 56" />
        <path d="M196 0 L124 56" />
        <path d="M0 90 L76 150" />
        <path d="M0 150 L76 90" />
        <path d="M244 90 L320 150" />
        <path d="M244 150 L320 90" />
        <path d="M124 184 L196 240" />
        <path d="M196 184 L124 240" />
      </g>
      <g fill="#19547E" opacity=".42">
        <circle cx="92" cy="55" r="2.5" />
        <circle cx="112" cy="55" r="2.5" />
        <circle cx="208" cy="55" r="2.5" />
        <circle cx="228" cy="55" r="2.5" />
        <circle cx="66" cy="76" r="2.5" />
        <circle cx="88" cy="76" r="2.5" />
        <circle cx="232" cy="76" r="2.5" />
        <circle cx="254" cy="76" r="2.5" />
        <circle cx="44" cy="98" r="2.5" />
        <circle cx="66" cy="98" r="2.5" />
        <circle cx="254" cy="98" r="2.5" />
        <circle cx="276" cy="98" r="2.5" />
        <circle cx="44" cy="142" r="2.5" />
        <circle cx="66" cy="142" r="2.5" />
        <circle cx="254" cy="142" r="2.5" />
        <circle cx="276" cy="142" r="2.5" />
        <circle cx="66" cy="164" r="2.5" />
        <circle cx="88" cy="164" r="2.5" />
        <circle cx="232" cy="164" r="2.5" />
        <circle cx="254" cy="164" r="2.5" />
        <circle cx="92" cy="185" r="2.5" />
        <circle cx="112" cy="185" r="2.5" />
        <circle cx="208" cy="185" r="2.5" />
        <circle cx="228" cy="185" r="2.5" />
      </g>
      <g fill="#123E61">
        <path d="M108 91 H219 L234 105 H99 Z" />
        <rect height="70" rx="2" width="10" x="108" y="103" />
        <rect height="70" rx="2" width="10" x="215" y="103" />
        <rect height="8" rx="2" width="108" x="112" y="108" />
        <rect height="8" rx="2" width="87" x="89" y="135" />
        <rect height="8" rx="2" width="87" x="89" y="158" />
        <path d="M94 122 L101 112 L108 122 V176 H94 Z" />
        <path d="M114 122 L121 112 L128 122 V176 H114 Z" />
        <path d="M134 122 L141 112 L148 122 V176 H134 Z" />
        <path d="M154 122 L161 112 L168 122 V176 H154 Z" />
        <path d="M169 145 L180 130 H205 L216 145 H222 Q228 145 228 151 V165 H218 Q216 176 206 176 Q196 176 194 165 H184 Q182 176 172 176 Q162 176 160 165 H157 V153 Q157 147 163 145 Z" />
      </g>
      <path d="M183 135 H201 L208 145 H176 Z" fill="#FFFFFF" />
    </svg>
  );
}

// 06: Paving & Alterations
export function PavingSvg({ className = "w-16 h-12 object-contain", ...props }: SvgProps) {
  return (
    <svg
      aria-label="Dynamic Handyman Paving Service Icon"
      className={className}
      fill="none"
      role="img"
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" stroke="#123E61" strokeLinecap="square" strokeLinejoin="round" strokeWidth="4">
        <path d="M160 24 L282 120 L160 216 L38 120 Z" />
        <path d="M124 0 L196 56" />
        <path d="M196 0 L124 56" />
        <path d="M0 90 L76 150" />
        <path d="M0 150 L76 90" />
        <path d="M244 90 L320 150" />
        <path d="M244 150 L320 90" />
        <path d="M124 184 L196 240" />
        <path d="M196 184 L124 240" />
      </g>
      <g fill="#19547E" opacity=".42">
        <circle cx="92" cy="55" r="2.5" />
        <circle cx="112" cy="55" r="2.5" />
        <circle cx="208" cy="55" r="2.5" />
        <circle cx="228" cy="55" r="2.5" />
        <circle cx="66" cy="76" r="2.5" />
        <circle cx="88" cy="76" r="2.5" />
        <circle cx="232" cy="76" r="2.5" />
        <circle cx="254" cy="76" r="2.5" />
        <circle cx="44" cy="98" r="2.5" />
        <circle cx="66" cy="98" r="2.5" />
        <circle cx="254" cy="98" r="2.5" />
        <circle cx="276" cy="98" r="2.5" />
        <circle cx="44" cy="142" r="2.5" />
        <circle cx="66" cy="142" r="2.5" />
        <circle cx="254" cy="142" r="2.5" />
        <circle cx="276" cy="142" r="2.5" />
        <circle cx="66" cy="164" r="2.5" />
        <circle cx="88" cy="164" r="2.5" />
        <circle cx="232" cy="164" r="2.5" />
        <circle cx="254" cy="164" r="2.5" />
        <circle cx="92" cy="185" r="2.5" />
        <circle cx="112" cy="185" r="2.5" />
        <circle cx="208" cy="185" r="2.5" />
        <circle cx="228" cy="185" r="2.5" />
      </g>
      <g fill="#123E61">
        <path d="M160 85 L190 102 L160 119 L130 102 Z" />
        <path d="M125 106 L155 123 L125 140 L95 123 Z" />
        <path d="M195 106 L225 123 L195 140 L165 123 Z" />
        <path d="M160 128 L190 145 L160 162 L130 145 Z" />
      </g>
    </svg>
  );
}
