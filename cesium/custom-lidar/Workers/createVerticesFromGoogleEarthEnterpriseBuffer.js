define(["./AxisAlignedBoundingBox-718a9087","./Transforms-1142ce48","./Cartesian2-08065eec","./when-ad3237a0","./TerrainEncoding-cd3482b3","./Math-5ca9b250","./OrientedBoundingBox-2cc6ca57","./RuntimeError-767bd866","./WebMercatorProjection-2bca7e98","./createTaskProcessorWorker","./Check-be2d5acb","./combine-1510933d","./AttributeCompression-9fbb8447","./ComponentDatatype-a867ddaa","./WebGLConstants-1c8239cc","./EllipsoidTangentPlane-f8b1fc8b","./IntersectionTests-75083888","./Plane-bb88dd7e"],(function(e,t,i,n,a,r,o,s,u,h,c,d,g,l,m,p,I,E){"use strict";var T=Uint16Array.BYTES_PER_ELEMENT,C=Int32Array.BYTES_PER_ELEMENT,f=Uint32Array.BYTES_PER_ELEMENT,v=Float32Array.BYTES_PER_ELEMENT,M=Float64Array.BYTES_PER_ELEMENT;function x(e,t,i){i=n.defaultValue(i,r.CesiumMath);for(var a=e.length,o=0;o<a;++o)if(i.equalsEpsilon(e[o],t,r.CesiumMath.EPSILON12))return o;return-1}var N=new i.Cartographic,b=new i.Cartesian3,S=new i.Cartesian3,w=new i.Cartesian3,B=new t.Matrix4;function P(e,a,o,s,u,h,c,d,g,l,m){for(var p=d.length,I=0;I<p;++I){var E=d[I],T=E.cartographic,C=E.index,f=e.length,v=T.longitude,M=T.latitude;M=r.CesiumMath.clamp(M,-r.CesiumMath.PI_OVER_TWO,r.CesiumMath.PI_OVER_TWO),T=T.height-c.skirtHeight,c.hMin=Math.min(c.hMin,T),i.Cartographic.fromRadians(v,M,T,N),l&&(N.longitude+=g),l?I===p-1?N.latitude+=m:0===I&&(N.latitude-=m):N.latitude+=g,M=c.ellipsoid.cartographicToCartesian(N),e.push(M),a.push(T),o.push(i.Cartesian2.clone(o[C])),0<s.length&&s.push(s[C]),0<u.length&&u.push(u[C]),t.Matrix4.multiplyByPoint(c.toENU,M,b),T=c.minimum,M=c.maximum,i.Cartesian3.minimumByComponent(b,T,T),i.Cartesian3.maximumByComponent(b,M,M),M=c.lastBorderPoint,n.defined(M)&&(M=M.index,h.push(M,f-1,f,f,C,M)),c.lastBorderPoint=E}}return h((function(h,c){h.ellipsoid=i.Ellipsoid.clone(h.ellipsoid),h.rectangle=i.Rectangle.clone(h.rectangle);var d=function(h,c,d,g,l,m,p,I,E,A,y){var R,_,W,F,O;_e=n.defined(g)?(R=g.west,_=g.south,W=g.east,F=g.north,O=g.width,g.height):(R=r.CesiumMath.toRadians(l.west),_=r.CesiumMath.toRadians(l.south),W=r.CesiumMath.toRadians(l.east),F=r.CesiumMath.toRadians(l.north),O=r.CesiumMath.toRadians(g.width),r.CesiumMath.toRadians(g.height));var Y,k,U=[_,F],V=[R,W],H=t.Transforms.eastNorthUpToFixedFrame(c,d),L=t.Matrix4.inverseTransformation(H,B);E&&(Y=u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(_),k=1/(u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(F)-Y));var D=1!==m,G=new DataView(h),j=Number.POSITIVE_INFINITY,z=Number.NEGATIVE_INFINITY,q=S;q.x=Number.POSITIVE_INFINITY,q.y=Number.POSITIVE_INFINITY,q.z=Number.POSITIVE_INFINITY;var J=w;J.x=Number.NEGATIVE_INFINITY,J.y=Number.NEGATIVE_INFINITY,J.z=Number.NEGATIVE_INFINITY;var K,Q,X=0,Z=0,$=0;for(Q=0;Q<4;++Q){var ee=X;K=G.getUint32(ee,!0),ee+=f;var te=r.CesiumMath.toRadians(180*G.getFloat64(ee,!0));ee+=M,-1===x(V,te)&&V.push(te),te=r.CesiumMath.toRadians(180*G.getFloat64(ee,!0)),ee+=M,-1===x(U,te)&&U.push(te),ee+=2*M,te=G.getInt32(ee,!0),ee+=C,Z+=te,$+=3*(te=G.getInt32(ee,!0)),X+=K+f}var ie=[],ne=[],ae=new Array(Z),re=new Array(Z),oe=new Array(Z),se=E?new Array(Z):[],ue=D?new Array(Z):[],he=new Array($),ce=[],de=[],ge=[],le=[],me=0,pe=0;for(Q=X=0;Q<4;++Q){K=G.getUint32(X,!0);var Ie=X+=f,Ee=r.CesiumMath.toRadians(180*G.getFloat64(X,!0));X+=M;var Te=r.CesiumMath.toRadians(180*G.getFloat64(X,!0));X+=M;var Ce=r.CesiumMath.toRadians(180*G.getFloat64(X,!0)),fe=.5*Ce;X+=M;var ve=r.CesiumMath.toRadians(180*G.getFloat64(X,!0)),Me=.5*ve;X+=M;var xe=G.getInt32(X,!0);X+=C;var Ne=G.getInt32(X,!0);X+=C,X+=C;for(var be=new Array(xe),Se=0;Se<xe;++Se){var we=Ee+G.getUint8(X++)*Ce;N.longitude=we;var Be=Te+G.getUint8(X++)*ve;N.latitude=Be;var Pe=G.getFloat32(X,!0);if(X+=v,0!==Pe&&Pe<y&&(Pe*=-Math.pow(2,A)),Pe*=6371010,N.height=Pe,-1!==x(V,we)||-1!==x(U,Be)){var Ae=x(ie,N,i.Cartographic);if(-1!==Ae){be[Se]=ne[Ae];continue}ie.push(i.Cartographic.clone(N)),ne.push(me)}be[Se]=me,Math.abs(we-R)<fe?ce.push({index:me,cartographic:i.Cartographic.clone(N)}):Math.abs(we-W)<fe?ge.push({index:me,cartographic:i.Cartographic.clone(N)}):Math.abs(Be-_)<Me?de.push({index:me,cartographic:i.Cartographic.clone(N)}):Math.abs(Be-F)<Me&&le.push({index:me,cartographic:i.Cartographic.clone(N)}),j=Math.min(Pe,j),z=Math.max(Pe,z),oe[me]=Pe,Ae=d.cartographicToCartesian(N),ae[me]=Ae,E&&(se[me]=(u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(Be)-Y)*k),D&&(Pe=d.geodeticSurfaceNormal(Ae),ue[me]=Pe),t.Matrix4.multiplyByPoint(L,Ae,b),i.Cartesian3.minimumByComponent(b,q,q),i.Cartesian3.maximumByComponent(b,J,J),we=(we-R)/(W-R),we=r.CesiumMath.clamp(we,0,1),Be=(Be-_)/(F-_),Be=r.CesiumMath.clamp(Be,0,1),re[me]=new i.Cartesian2(we,Be),++me}for(var ye=3*Ne,Re=0;Re<ye;++Re,++pe)he[pe]=be[G.getUint16(X,!0)],X+=T;if(K!==X-Ie)throw new s.RuntimeError("Invalid terrain tile.")}ae.length=me,re.length=me,oe.length=me,E&&(se.length=me),D&&(ue.length=me);var _e,We=me;l=pe,h={hMin:j,lastBorderPoint:void 0,skirtHeight:I,toENU:L,ellipsoid:d,minimum:q,maximum:J},ce.sort((function(e,t){return t.cartographic.latitude-e.cartographic.latitude})),de.sort((function(e,t){return e.cartographic.longitude-t.cartographic.longitude})),ge.sort((function(e,t){return e.cartographic.latitude-t.cartographic.latitude})),le.sort((function(e,t){return t.cartographic.longitude-e.cartographic.longitude})),P(ae,oe,re,se,ue,he,h,ce,-(I=1e-5)*O,!0,-I*_e),P(ae,oe,re,se,ue,he,h,de,-I*_e,!1),P(ae,oe,re,se,ue,he,h,ge,I*O,!0,I*_e),P(ae,oe,re,se,ue,he,h,le,I*_e,!1),0<ce.length&&0<le.length&&(Oe=ce[0].index,Ye=le[le.length-1].index,_e=ae.length-1,he.push(Ye,_e,We,We,Oe,Ye)),Z=ae.length;var Fe,Oe=t.BoundingSphere.fromPoints(ae);n.defined(g)&&(Fe=o.OrientedBoundingBox.fromRectangle(g,j,z,d));for(var Ye=new a.EllipsoidalOccluder(d).computeHorizonCullingPointPossiblyUnderEllipsoid(c,ae,j),ke=(g=new e.AxisAlignedBoundingBox(q,J,c),new a.TerrainEncoding(c,g,h.hMin,z,H,!1,E,D,m,p)),Ue=new Float32Array(Z*ke.stride),Ve=0,He=0;He<Z;++He)Ve=ke.encode(Ue,Ve,ae[He],re[He],oe[He],void 0,se[He],ue[He]);return h=ce.map((function(e){return e.index})).reverse(),H=de.map((function(e){return e.index})).reverse(),m=ge.map((function(e){return e.index})).reverse(),p=le.map((function(e){return e.index})).reverse(),H.unshift(m[m.length-1]),H.push(h[0]),p.unshift(h[h.length-1]),p.push(m[0]),{vertices:Ue,indices:new Uint16Array(he),maximumHeight:z,minimumHeight:j,encoding:ke,boundingSphere3D:Oe,orientedBoundingBox:Fe,occludeePointInScaledSpace:Ye,vertexCountWithoutSkirts:We,indexCountWithoutSkirts:l,westIndicesSouthToNorth:h,southIndicesEastToWest:H,eastIndicesNorthToSouth:m,northIndicesWestToEast:p}}(h.buffer,h.relativeToCenter,h.ellipsoid,h.rectangle,h.nativeRectangle,h.exaggeration,h.exaggerationRelativeHeight,h.skirtHeight,h.includeWebMercatorT,h.negativeAltitudeExponentBias,h.negativeElevationThreshold),g=d.vertices;return c.push(g.buffer),h=d.indices,c.push(h.buffer),{vertices:g.buffer,indices:h.buffer,numberOfAttributes:d.encoding.stride,minimumHeight:d.minimumHeight,maximumHeight:d.maximumHeight,boundingSphere3D:d.boundingSphere3D,orientedBoundingBox:d.orientedBoundingBox,occludeePointInScaledSpace:d.occludeePointInScaledSpace,encoding:d.encoding,vertexCountWithoutSkirts:d.vertexCountWithoutSkirts,indexCountWithoutSkirts:d.indexCountWithoutSkirts,westIndicesSouthToNorth:d.westIndicesSouthToNorth,southIndicesEastToWest:d.southIndicesEastToWest,eastIndicesNorthToSouth:d.eastIndicesNorthToSouth,northIndicesWestToEast:d.northIndicesWestToEast}}))}));