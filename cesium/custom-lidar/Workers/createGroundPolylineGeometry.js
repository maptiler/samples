define(["./Transforms-1142ce48","./Cartesian2-08065eec","./Check-be2d5acb","./when-ad3237a0","./Math-5ca9b250","./ArcType-98ec98bf","./arrayRemoveDuplicates-707c233c","./ComponentDatatype-a867ddaa","./EllipsoidGeodesic-dc284f08","./EllipsoidRhumbLine-4a6ed5de","./EncodedCartesian3-a785c24c","./GeometryAttribute-da891979","./IntersectionTests-75083888","./Plane-bb88dd7e","./WebMercatorProjection-2bca7e98","./combine-1510933d","./RuntimeError-767bd866","./WebGLConstants-1c8239cc"],(function(e,a,t,n,i,r,s,o,l,u,c,C,d,p,h,g,m,f){"use strict";function w(t){t=n.defaultValue(t,n.defaultValue.EMPTY_OBJECT),this._ellipsoid=n.defaultValue(t.ellipsoid,a.Ellipsoid.WGS84),this._rectangle=n.defaultValue(t.rectangle,a.Rectangle.MAX_VALUE),this._projection=new e.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=n.defaultValue(t.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=n.defaultValue(t.numberOfLevelZeroTilesY,1)}Object.defineProperties(w.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),w.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},w.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},w.prototype.rectangleToNativeRectangle=function(e,t){var r=i.CesiumMath.toDegrees(e.west),s=i.CesiumMath.toDegrees(e.south),o=i.CesiumMath.toDegrees(e.east);return e=i.CesiumMath.toDegrees(e.north),n.defined(t)?(t.west=r,t.south=s,t.east=o,t.north=e,t):new a.Rectangle(r,s,o,e)},w.prototype.tileXYToNativeRectangle=function(e,a,t,n){return(n=this.tileXYToRectangle(e,a,t,n)).west=i.CesiumMath.toDegrees(n.west),n.south=i.CesiumMath.toDegrees(n.south),n.east=i.CesiumMath.toDegrees(n.east),n.north=i.CesiumMath.toDegrees(n.north),n},w.prototype.tileXYToRectangle=function(e,t,i,r){var s=this._rectangle,o=this.getNumberOfXTilesAtLevel(i),l=this.getNumberOfYTilesAtLevel(i);return o=e*(i=s.width/o)+s.west,e=(e+1)*i+s.west,i=s.height/l,l=s.north-t*i,i=s.north-(t+1)*i,(r=n.defined(r)?r:new a.Rectangle(o,i,e,l)).west=o,r.south=i,r.east=e,r.north=l,r},w.prototype.positionToTileXY=function(e,t,r){var s=this._rectangle;if(a.Rectangle.contains(s,e)){var o=this.getNumberOfXTilesAtLevel(t),l=this.getNumberOfYTilesAtLevel(t),u=s.width/o,c=s.height/l;return t=e.longitude,s.east<s.west&&(t+=i.CesiumMath.TWO_PI),o<=(u=(t-s.west)/u|0)&&(u=o-1),l<=(c=(s.north-e.latitude)/c|0)&&(c=l-1),n.defined(r)?(r.x=u,r.y=c,r):new a.Cartesian2(u,c)}};var y=new a.Cartesian3,v=new a.Cartesian3,M=new a.Cartographic,T=new a.Cartesian3,E=new a.Cartesian3,_=new e.BoundingSphere,O=new w,b=[new a.Cartographic,new a.Cartographic,new a.Cartographic,new a.Cartographic],P=new a.Cartesian2,k={};function A(e){a.Cartographic.fromRadians(e.east,e.north,0,b[0]),a.Cartographic.fromRadians(e.west,e.north,0,b[1]),a.Cartographic.fromRadians(e.east,e.south,0,b[2]),a.Cartographic.fromRadians(e.west,e.south,0,b[3]);for(var t=0,n=0,i=0,r=0,s=k._terrainHeightsMaxLevel,o=0;o<=s;++o){for(var l=!1,u=0;u<4;++u)if(O.positionToTileXY(b[u],o,P),0===u)i=P.x,r=P.y;else if(i!==P.x||r!==P.y){l=!0;break}if(l)break;t=i,n=r}if(0!==o)return{x:t,y:n,level:s<o?s:o-1}}k.initialize=function(){var a=k._initPromise;return n.defined(a)?a:(a=e.Resource.fetchJson(e.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){k._terrainHeights=e})),k._initPromise=a)},k.getMinimumMaximumHeights=function(e,t){t=n.defaultValue(t,a.Ellipsoid.WGS84);var i=A(e),r=k._defaultMinTerrainHeight,s=k._defaultMaxTerrainHeight;return n.defined(i)&&(i=i.level+"-"+i.x+"-"+i.y,i=k._terrainHeights[i],n.defined(i)&&(r=i[0],s=i[1]),t.cartographicToCartesian(a.Rectangle.northeast(e,M),y),t.cartographicToCartesian(a.Rectangle.southwest(e,M),v),a.Cartesian3.midpoint(v,y,T),t=t.scaleToGeodeticSurface(T,E),r=n.defined(t)?(t=a.Cartesian3.distance(T,t),Math.min(r,-t)):k._defaultMinTerrainHeight),{minimumTerrainHeight:r=Math.max(k._defaultMinTerrainHeight,r),maximumTerrainHeight:s}},k.getBoundingSphere=function(t,i){i=n.defaultValue(i,a.Ellipsoid.WGS84);var r=A(t),s=k._defaultMaxTerrainHeight;n.defined(r)&&(o=r.level+"-"+r.x+"-"+r.y,o=k._terrainHeights[o],n.defined(o)&&(s=o[1]));var o=e.BoundingSphere.fromRectangle3D(t,i,0);return e.BoundingSphere.fromRectangle3D(t,i,s,_),e.BoundingSphere.union(o,_,o)},k._terrainHeightsMaxLevel=6,k._defaultMaxTerrainHeight=9e3,k._defaultMinTerrainHeight=-1e5,k._terrainHeights=void 0,k._initPromise=void 0,Object.defineProperties(k,{initialized:{get:function(){return n.defined(k._terrainHeights)}}});var L=[e.GeographicProjection,h.WebMercatorProjection],S=L.length,I=Math.cos(i.CesiumMath.toRadians(30)),x=Math.cos(i.CesiumMath.toRadians(150));function N(e){var t=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).positions;this.width=n.defaultValue(e.width,1),this._positions=t,this.granularity=n.defaultValue(e.granularity,9999),this.loop=n.defaultValue(e.loop,!1),this.arcType=n.defaultValue(e.arcType,r.ArcType.GEODESIC),this._ellipsoid=a.Ellipsoid.WGS84,this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(N.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+a.Ellipsoid.packedLength+1+1}}}),N.setProjectionAndEllipsoid=function(e,a){for(var t=0,n=0;n<S;n++)if(a instanceof L[n]){t=n;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var R=new a.Cartesian3,D=new a.Cartesian3,z=new a.Cartesian3;function H(e,t,n,i,r){var s=q(i,e,0,R);return n=q(i,e,n,D),t=q(i,t,0,z),n=X(n,s,D),s=X(t,s,z),a.Cartesian3.cross(s,n,r),a.Cartesian3.normalize(r,r)}var B=new a.Cartographic,j=new a.Cartesian3,G=new a.Cartesian3,V=new a.Cartesian3;function Y(e,t,n,i,s,o,c,C,d,p,h){var g;if(0!==s&&(o===r.ArcType.GEODESIC?g=new l.EllipsoidGeodesic(e,t,c):o===r.ArcType.RHUMB&&(g=new u.EllipsoidRhumbLine(e,t,c)),!((o=g.surfaceDistance)<s)))for(var m=H(e,t,i,c,V),f=o/(s=Math.ceil(o/s)),w=f,y=s-1,v=C.length,M=0;M<y;M++){var T=g.interpolateUsingSurfaceDistance(w,B),E=q(c,T,n,j),_=q(c,T,i,G);a.Cartesian3.pack(m,C,v),a.Cartesian3.pack(E,d,v),a.Cartesian3.pack(_,p,v),h.push(T.latitude),h.push(T.longitude),v+=3,w+=f}}var F=new a.Cartographic;function q(e,t,n,i){return a.Cartographic.clone(t,F),F.height=n,a.Cartographic.toCartesian(F,e,i)}function X(e,t,n){return a.Cartesian3.subtract(e,t,n),a.Cartesian3.normalize(n,n),n}function W(e,t,n,i){return i=X(e,t,i),i=a.Cartesian3.cross(i,n,i),i=a.Cartesian3.normalize(i,i),a.Cartesian3.cross(n,i,i)}N.pack=function(e,t,i){var r=n.defaultValue(i,0),s=e._positions,o=s.length;t[r++]=o;for(var l=0;l<o;++l){var u=s[l];a.Cartesian3.pack(u,t,r),r+=3}return t[r++]=e.granularity,t[r++]=e.loop?1:0,t[r++]=e.arcType,a.Ellipsoid.pack(e._ellipsoid,t,r),r+=a.Ellipsoid.packedLength,t[r++]=e._projectionIndex,t[r++]=e._scene3DOnly?1:0,t},N.unpack=function(e,t,i){for(var r=n.defaultValue(t,0),s=e[r++],o=new Array(s),l=0;l<s;l++)o[l]=a.Cartesian3.unpack(e,r),r+=3;var u=e[r++],c=1===e[r++],C=e[r++],d=a.Ellipsoid.unpack(e,r);r+=a.Ellipsoid.packedLength;var p=e[r++];return t=1===e[r++],(i=n.defined(i)?i:new N({positions:o}))._positions=o,i.granularity=u,i.loop=c,i.arcType=C,i._ellipsoid=d,i._projectionIndex=p,i._scene3DOnly=t,i};var U=new a.Cartesian3,Z=new a.Cartesian3,J=new a.Cartesian3,Q=new a.Cartesian3;function K(e,t,n,r,s){return e=W(e,t,n=X(n,t,Q),U),t=W(r,t,n,Z),i.CesiumMath.equalsEpsilon(a.Cartesian3.dot(e,t),-1,i.CesiumMath.EPSILON5)?(s=a.Cartesian3.cross(n,e,s),a.Cartesian3.normalize(s,s)):(s=a.Cartesian3.add(t,e,s),s=a.Cartesian3.normalize(s,s),n=a.Cartesian3.cross(n,s,J),a.Cartesian3.dot(t,n)<0?a.Cartesian3.negate(s,s):s)}var $=p.Plane.fromPointNormal(a.Cartesian3.ZERO,a.Cartesian3.UNIT_Y),ee=new a.Cartesian3,ae=new a.Cartesian3,te=new a.Cartesian3,ne=new a.Cartesian3,ie=new a.Cartesian3,re=new a.Cartesian3,se=new a.Cartographic,oe=new a.Cartographic,le=new a.Cartographic;N.createGeometry=function(t){var l,p,h,g,m,f=!t._scene3DOnly,w=t.loop,y=t._ellipsoid,v=t.granularity,M=t.arcType,T=new L[t._projectionIndex](y),E=1e3,_=t._positions,O=_.length;2===O&&(w=!1);for(var b,P,A,S=new u.EllipsoidRhumbLine(void 0,void 0,y),x=[_[0]],N=0;N<O-1;N++)p=_[N],h=_[N+1],b=d.IntersectionTests.lineSegmentPlane(p,h,$,re),!n.defined(b)||a.Cartesian3.equalsEpsilon(b,p,i.CesiumMath.EPSILON7)||a.Cartesian3.equalsEpsilon(b,h,i.CesiumMath.EPSILON7)||(t.arcType===r.ArcType.GEODESIC?x.push(a.Cartesian3.clone(b)):t.arcType===r.ArcType.RHUMB&&(A=y.cartesianToCartographic(b,se).longitude,g=y.cartesianToCartographic(p,se),m=y.cartesianToCartographic(h,oe),S.setEndPoints(g,m),P=S.findIntersectionWithLongitude(A,le),b=y.cartographicToCartesian(P,re),!n.defined(b)||a.Cartesian3.equalsEpsilon(b,p,i.CesiumMath.EPSILON7)||a.Cartesian3.equalsEpsilon(b,h,i.CesiumMath.EPSILON7)||x.push(a.Cartesian3.clone(b)))),x.push(h);w&&(p=_[O-1],h=_[0],b=d.IntersectionTests.lineSegmentPlane(p,h,$,re),!n.defined(b)||a.Cartesian3.equalsEpsilon(b,p,i.CesiumMath.EPSILON7)||a.Cartesian3.equalsEpsilon(b,h,i.CesiumMath.EPSILON7)||(t.arcType===r.ArcType.GEODESIC?x.push(a.Cartesian3.clone(b)):t.arcType===r.ArcType.RHUMB&&(A=y.cartesianToCartographic(b,se).longitude,g=y.cartesianToCartographic(p,se),m=y.cartesianToCartographic(h,oe),S.setEndPoints(g,m),P=S.findIntersectionWithLongitude(A,le),b=y.cartographicToCartesian(P,re),!n.defined(b)||a.Cartesian3.equalsEpsilon(b,p,i.CesiumMath.EPSILON7)||a.Cartesian3.equalsEpsilon(b,h,i.CesiumMath.EPSILON7)||x.push(a.Cartesian3.clone(b)))));var R=x.length,D=new Array(R);for(N=0;N<R;N++){var z=a.Cartographic.fromCartesian(x[N],y);z.height=0,D[N]=z}if(!((R=(D=s.arrayRemoveDuplicates(D,a.Cartographic.equalsEpsilon)).length)<2)){var B=[],j=[],G=[],V=[],F=ee,W=ae,U=te,Z=ne,J=ie,Q=D[0],ue=D[1];for(F=q(y,D[R-1],0,F),Z=q(y,ue,0,Z),W=q(y,Q,0,W),U=q(y,Q,E,U),J=w?K(F,W,U,Z,J):H(Q,ue,E,y,J),a.Cartesian3.pack(J,j,0),a.Cartesian3.pack(W,G,0),a.Cartesian3.pack(U,V,0),B.push(Q.latitude),B.push(Q.longitude),Y(Q,ue,0,E,v,M,y,j,G,V,B),N=1;N<R-1;++N){F=a.Cartesian3.clone(W,F),W=a.Cartesian3.clone(Z,W);var ce=D[N];q(y,ce,E,U),q(y,D[N+1],0,Z),K(F,W,U,Z,J),l=j.length,a.Cartesian3.pack(J,j,l),a.Cartesian3.pack(W,G,l),a.Cartesian3.pack(U,V,l),B.push(ce.latitude),B.push(ce.longitude),Y(D[N],D[N+1],0,E,v,M,y,j,G,V,B)}var Ce=D[R-1],pe=D[R-2];if(W=q(y,Ce,0,W),U=q(y,Ce,E,U),J=w?(ue=D[0],K(F=q(y,pe,0,F),W,U,Z=q(y,ue,0,Z),J)):H(pe,Ce,E,y,J),l=j.length,a.Cartesian3.pack(J,j,l),a.Cartesian3.pack(W,G,l),a.Cartesian3.pack(U,V,l),B.push(Ce.latitude),B.push(Ce.longitude),w){for(Y(Ce,Q,0,E,v,M,y,j,G,V,B),l=j.length,N=0;N<3;++N)j[l+N]=j[N],G[l+N]=G[N],V[l+N]=V[N];B.push(Q.latitude),B.push(Q.longitude)}return function(t,n,r,s,l,u,d){var p,h,g,m,f,w,y=n._ellipsoid,v=r.length/3-1,M=8*v,T=4*M,E=new(65535<M?Uint32Array:Uint16Array)(36*v),_=new Float64Array(3*M),O=new Float32Array(T),b=new Float32Array(T),P=new Float32Array(T),A=new Float32Array(T),L=new Float32Array(T);d&&(g=new Float32Array(T),m=new Float32Array(T),f=new Float32Array(T),w=new Float32Array(2*M));var S=u.length/2,x=0,N=Te;N.height=0;var R=Ee;R.height=0;var D=_e,z=Oe;if(d)for(h=0,p=1;p<S;p++)N.latitude=u[h],N.longitude=u[h+1],R.latitude=u[h+2],R.longitude=u[h+3],D=n.project(N,D),z=n.project(R,z),x+=a.Cartesian3.distance(D,z),h+=2;var H=s.length/3;z=a.Cartesian3.unpack(s,0,z);var B,j=0;for(h=3,p=1;p<H;p++)D=a.Cartesian3.clone(z,D),z=a.Cartesian3.unpack(s,h,z),j+=a.Cartesian3.distance(D,z),h+=3;h=3;var G=0,V=0,Y=0,F=0,q=!1,W=a.Cartesian3.unpack(r,0,Pe),U=a.Cartesian3.unpack(s,0,Oe),Z=a.Cartesian3.unpack(l,0,Ae);t&&de(Z,ga=a.Cartesian3.unpack(r,r.length-6,be),W,U)&&(Z=a.Cartesian3.negate(Z,Z));var J,Q,K,$,ee,ae,te,ne=0,ie=0,re=0;for(p=0;p<v;p++){var se=a.Cartesian3.clone(W,be),oe=a.Cartesian3.clone(U,_e),le=a.Cartesian3.clone(Z,ke);q&&(le=a.Cartesian3.negate(le,le)),W=a.Cartesian3.unpack(r,h,Pe),U=a.Cartesian3.unpack(s,h,Oe),q=de(Z=a.Cartesian3.unpack(l,h,Ae),se,W,U),N.latitude=u[G],N.longitude=u[G+1],R.latitude=u[G+2],R.longitude=u[G+3],d&&(pa=function(e,a){var t=Math.abs(e.longitude),n=Math.abs(a.longitude);if(i.CesiumMath.equalsEpsilon(t,i.CesiumMath.PI,i.CesiumMath.EPSILON11)){var r=i.CesiumMath.sign(a.longitude);return e.longitude=r*(t-i.CesiumMath.EPSILON11),1}return i.CesiumMath.equalsEpsilon(n,i.CesiumMath.PI,i.CesiumMath.EPSILON11)?(e=i.CesiumMath.sign(e.longitude),a.longitude=e*(n-i.CesiumMath.EPSILON11),2):0}(N,R),J=n.project(N,De),(na=X(Q=n.project(R,ze),J,Ue)).y=Math.abs(na.y),K=He,$=Be,0===pa||a.Cartesian3.dot(na,a.Cartesian3.UNIT_Y)>I?(K=me(n,N,le,J,He),$=me(n,R,Z,Q,Be)):1===pa?($=me(n,R,Z,Q,Be),K.x=0,K.y=i.CesiumMath.sign(N.longitude-Math.abs(R.longitude)),K.z=0):(K=me(n,N,le,J,He),$.x=0,$.y=i.CesiumMath.sign(N.longitude-R.longitude),$.z=0));var ue=a.Cartesian3.distance(oe,U),ce=c.EncodedCartesian3.fromCartesian(se,Xe),Ce=a.Cartesian3.subtract(W,se,je),pe=a.Cartesian3.normalize(Ce,Ye),he=a.Cartesian3.subtract(oe,se,Ge);he=a.Cartesian3.normalize(he,he);var ge=a.Cartesian3.cross(pe,he,Ye);ge=a.Cartesian3.normalize(ge,ge);var fe=a.Cartesian3.cross(he,le,Fe);fe=a.Cartesian3.normalize(fe,fe);var we=a.Cartesian3.subtract(U,W,Ve);we=a.Cartesian3.normalize(we,we);var ve=a.Cartesian3.cross(Z,we,qe);ve=a.Cartesian3.normalize(ve,ve);var aa=ue/j,ta=ne/j,na=0,ia=0,ra=0;for(d&&(na=a.Cartesian3.distance(J,Q),ee=c.EncodedCartesian3.fromCartesian(J,We),ae=a.Cartesian3.subtract(Q,J,Ue),da=(te=a.Cartesian3.normalize(ae,Ze)).x,te.x=te.y,te.y=-da,ia=na/x,ra=ie/x),B=0;B<8;B++){var sa=F+4*B,oa=V+2*B,la=sa+3,ua=B<4?1:-1,ca=2===B||3===B||6===B||7===B?1:-1;a.Cartesian3.pack(ce.high,O,sa),O[la]=Ce.x,a.Cartesian3.pack(ce.low,b,sa),b[la]=Ce.y,a.Cartesian3.pack(fe,P,sa),P[la]=Ce.z,a.Cartesian3.pack(ve,A,sa),A[la]=aa*ua,a.Cartesian3.pack(ge,L,sa);var Ca=ta*ca;0===Ca&&ca<0&&(Ca=9),L[la]=Ca,d&&(g[sa]=ee.high.x,g[sa+1]=ee.high.y,g[sa+2]=ee.low.x,g[sa+3]=ee.low.y,f[sa]=-K.y,f[sa+1]=K.x,f[sa+2]=$.y,f[sa+3]=-$.x,m[sa]=ae.x,m[sa+1]=ae.y,m[sa+2]=te.x,m[sa+3]=te.y,w[oa]=ia*ua,0==(Ca=ra*ca)&&ca<0&&(Ca=9),w[oa+1]=Ca)}var da,pa=Ne;pe=Re,he=Ie,le=xe,we=a.Rectangle.fromCartographicArray(Le,Se),re+=we=(da=k.getMinimumMaximumHeights(we,y)).minimumTerrainHeight,re+=da=da.maximumTerrainHeight,ye(se,oe,we,da,pa,he),ye(W,U,we,da,pe,le),da=a.Cartesian3.multiplyByScalar(ge,i.CesiumMath.EPSILON5,Je),a.Cartesian3.add(pa,da,pa),a.Cartesian3.add(pe,da,pe),a.Cartesian3.add(he,da,he),a.Cartesian3.add(le,da,le),Me(pa,pe),Me(he,le),a.Cartesian3.pack(pa,_,Y),a.Cartesian3.pack(pe,_,Y+3),a.Cartesian3.pack(le,_,Y+6),a.Cartesian3.pack(he,_,Y+9),da=a.Cartesian3.multiplyByScalar(ge,-2*i.CesiumMath.EPSILON5,Je),a.Cartesian3.add(pa,da,pa),a.Cartesian3.add(pe,da,pe),a.Cartesian3.add(he,da,he),a.Cartesian3.add(le,da,le),Me(pa,pe),Me(he,le),a.Cartesian3.pack(pa,_,Y+12),a.Cartesian3.pack(pe,_,Y+15),a.Cartesian3.pack(le,_,Y+18),a.Cartesian3.pack(he,_,Y+21),G+=2,h+=3,V+=16,Y+=24,F+=32,ne+=ue,ie+=na}var ha=h=0;for(p=0;p<v;p++){for(B=0;B<$e;B++)E[h+B]=Ke[B]+ha;ha+=8,h+=$e}t=Qe,e.BoundingSphere.fromVertices(r,a.Cartesian3.ZERO,3,t[0]),e.BoundingSphere.fromVertices(s,a.Cartesian3.ZERO,3,t[1]);var ga=e.BoundingSphere.fromBoundingSpheres(t);return ga.radius+=re/(2*v),t={position:new C.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:_}),startHiAndForwardOffsetX:ea(O),startLoAndForwardOffsetY:ea(b),startNormalAndForwardOffsetZ:ea(P),endNormalAndTextureCoordinateNormalizationX:ea(A),rightNormalAndTextureCoordinateNormalizationY:ea(L)},d&&(t.startHiLo2D=ea(g),t.offsetAndRight2D=ea(m),t.startEndNormals2D=ea(f),t.texcoordNormalization2D=new C.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:w})),new C.Geometry({attributes:t,indices:E,boundingSphere:ga})}(w,T,G,V,j,B,f)}};var ue=new a.Cartesian3,ce=new e.Matrix3,Ce=new e.Quaternion;function de(t,n,r,s){return n=X(r,n,ue),n=a.Cartesian3.dot(n,t),(I<n||n<x)&&(r=X(s,r,Q),n=n<x?i.CesiumMath.PI_OVER_TWO:-i.CesiumMath.PI_OVER_TWO,n=e.Quaternion.fromAxisAngle(r,n,Ce),n=e.Matrix3.fromQuaternion(n,ce),e.Matrix3.multiplyByVector(n,t,t),!0)}var pe=new a.Cartographic,he=new a.Cartesian3,ge=new a.Cartesian3;function me(e,t,n,r,s){var o=a.Cartographic.toCartesian(t,e._ellipsoid,he),l=a.Cartesian3.add(o,n,ge),u=!1,c=e._ellipsoid,C=c.cartesianToCartographic(l,pe);return Math.abs(t.longitude-C.longitude)>i.CesiumMath.PI_OVER_TWO&&(u=!0,l=a.Cartesian3.subtract(o,n,ge),C=c.cartesianToCartographic(l,pe)),C.height=0,C=e.project(C,s),(s=a.Cartesian3.subtract(C,r,s)).z=0,s=a.Cartesian3.normalize(s,s),u&&a.Cartesian3.negate(s,s),s}var fe=new a.Cartesian3,we=new a.Cartesian3;function ye(e,t,n,i,r,s){var o=a.Cartesian3.subtract(t,e,fe);a.Cartesian3.normalize(o,o),n=a.Cartesian3.multiplyByScalar(o,n-0,we),a.Cartesian3.add(e,n,r),n=a.Cartesian3.multiplyByScalar(o,i-1e3,we),a.Cartesian3.add(t,n,s)}var ve=new a.Cartesian3;function Me(e,t){var n=p.Plane.getPointDistance($,e),r=p.Plane.getPointDistance($,t),s=ve;i.CesiumMath.equalsEpsilon(n,0,i.CesiumMath.EPSILON2)?(s=X(t,e,s),a.Cartesian3.multiplyByScalar(s,i.CesiumMath.EPSILON2,s),a.Cartesian3.add(e,s,e)):i.CesiumMath.equalsEpsilon(r,0,i.CesiumMath.EPSILON2)&&(s=X(e,t,s),a.Cartesian3.multiplyByScalar(s,i.CesiumMath.EPSILON2,s),a.Cartesian3.add(t,s,t))}var Te=new a.Cartographic,Ee=new a.Cartographic,_e=new a.Cartesian3,Oe=new a.Cartesian3,be=new a.Cartesian3,Pe=new a.Cartesian3,ke=new a.Cartesian3,Ae=new a.Cartesian3,Le=[Te,Ee],Se=new a.Rectangle,Ie=new a.Cartesian3,xe=new a.Cartesian3,Ne=new a.Cartesian3,Re=new a.Cartesian3,De=new a.Cartesian3,ze=new a.Cartesian3,He=new a.Cartesian3,Be=new a.Cartesian3,je=new a.Cartesian3,Ge=new a.Cartesian3,Ve=new a.Cartesian3,Ye=new a.Cartesian3,Fe=new a.Cartesian3,qe=new a.Cartesian3,Xe=new c.EncodedCartesian3,We=new c.EncodedCartesian3,Ue=new a.Cartesian3,Ze=new a.Cartesian3,Je=new a.Cartesian3,Qe=[new e.BoundingSphere,new e.BoundingSphere],Ke=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],$e=Ke.length;function ea(e){return new C.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return N._projectNormal=me,function(e,a){return k.initialize().then((function(){return n.defined(a)&&(e=N.unpack(e,a)),N.createGeometry(e)}))}}));