define(["./when-ad3237a0","./Cartesian2-08065eec","./GeometryOffsetAttribute-03006e80","./Transforms-1142ce48","./ComponentDatatype-a867ddaa","./Check-be2d5acb","./GeometryAttribute-da891979","./GeometryAttributes-27dc652d","./IndexDatatype-9504f550","./Math-5ca9b250","./PolygonPipeline-ac773b7c","./RectangleGeometryLibrary-93ea1205","./combine-1510933d","./RuntimeError-767bd866","./WebGLConstants-1c8239cc","./EllipsoidRhumbLine-4a6ed5de"],(function(e,t,i,a,r,n,o,l,u,s,c,d,p,g,f,h){"use strict";var y=new a.BoundingSphere,m=new a.BoundingSphere,b=new t.Cartesian3,_=new t.Rectangle;function v(e,t){var i=e._ellipsoid,a=t.height,n=t.width,s=t.northCap,c=a,p=2,g=0;e=4,s&&(--p,--c,g+=1,e-=2),(v=t.southCap)&&(--p,--c,g+=1,e-=2),g+=p*n+2*c-e;var f,h=new Float64Array(3*g),y=0,m=0,_=b;if(s)d.RectangleGeometryLibrary.computePosition(t,i,!1,m,0,_),h[y++]=_.x,h[y++]=_.y,h[y++]=_.z;else for(f=0;f<n;f++)d.RectangleGeometryLibrary.computePosition(t,i,!1,m,f,_),h[y++]=_.x,h[y++]=_.y,h[y++]=_.z;for(f=n-1,m=1;m<a;m++)d.RectangleGeometryLibrary.computePosition(t,i,!1,m,f,_),h[y++]=_.x,h[y++]=_.y,h[y++]=_.z;if(m=a-1,!v)for(f=n-2;0<=f;f--)d.RectangleGeometryLibrary.computePosition(t,i,!1,m,f,_),h[y++]=_.x,h[y++]=_.y,h[y++]=_.z;for(f=0,m=a-2;0<m;m--)d.RectangleGeometryLibrary.computePosition(t,i,!1,m,f,_),h[y++]=_.x,h[y++]=_.y,h[y++]=_.z;for(var v=h.length/3*2,E=u.IndexDatatype.createTypedArray(h.length/3,v),A=0,G=0;G<h.length/3-1;G++)E[A++]=G,E[A++]=G+1;return E[A++]=h.length/3-1,E[A++]=0,(v=new o.Geometry({attributes:new l.GeometryAttributes,primitiveType:o.PrimitiveType.LINES})).attributes.position=new o.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:h}),v.indices=E,v}function E(i){var a=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).rectangle,r=e.defaultValue(i.granularity,s.CesiumMath.RADIANS_PER_DEGREE),n=e.defaultValue(i.ellipsoid,t.Ellipsoid.WGS84),o=e.defaultValue(i.rotation,0),l=e.defaultValue(i.height,0),u=e.defaultValue(i.extrudedHeight,l);this._rectangle=t.Rectangle.clone(a),this._granularity=r,this._ellipsoid=n,this._surfaceHeight=Math.max(l,u),this._rotation=o,this._extrudedHeight=Math.min(l,u),this._offsetAttribute=i.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}E.packedLength=t.Rectangle.packedLength+t.Ellipsoid.packedLength+5,E.pack=function(i,a,r){return r=e.defaultValue(r,0),t.Rectangle.pack(i._rectangle,a,r),r+=t.Rectangle.packedLength,t.Ellipsoid.pack(i._ellipsoid,a,r),r+=t.Ellipsoid.packedLength,a[r++]=i._granularity,a[r++]=i._surfaceHeight,a[r++]=i._rotation,a[r++]=i._extrudedHeight,a[r]=e.defaultValue(i._offsetAttribute,-1),a};var A=new t.Rectangle,G=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),R={rectangle:A,ellipsoid:G,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};E.unpack=function(i,a,r){a=e.defaultValue(a,0);var n=t.Rectangle.unpack(i,a,A);a+=t.Rectangle.packedLength;var o=t.Ellipsoid.unpack(i,a,G);a+=t.Ellipsoid.packedLength;var l=i[a++],u=i[a++],s=i[a++],c=i[a++];return a=i[a],e.defined(r)?(r._rectangle=t.Rectangle.clone(n,r._rectangle),r._ellipsoid=t.Ellipsoid.clone(o,r._ellipsoid),r._surfaceHeight=u,r._rotation=s,r._extrudedHeight=c,r._offsetAttribute=-1===a?void 0:a,r):(R.granularity=l,R.height=u,R.rotation=s,R.extrudedHeight=c,R.offsetAttribute=-1===a?void 0:a,new E(R))};var P=new t.Cartographic;return E.createGeometry=function(t){var n=t._rectangle,l=t._ellipsoid,p=d.RectangleGeometryLibrary.computeOptions(n,t._granularity,t._rotation,0,_,P);if(!s.CesiumMath.equalsEpsilon(n.north,n.south,s.CesiumMath.EPSILON10)&&!s.CesiumMath.equalsEpsilon(n.east,n.west,s.CesiumMath.EPSILON10)){var g,f,h,b,E=t._surfaceHeight,A=t._extrudedHeight;return E=s.CesiumMath.equalsEpsilon(E,A,0,s.CesiumMath.EPSILON2)?((f=v(t,p)).attributes.position.values=c.PolygonPipeline.scaleToGeodeticHeight(f.attributes.position.values,E,l,!1),e.defined(t._offsetAttribute)&&(p=f.attributes.position.values.length,p=new Uint8Array(p/3),b=t._offsetAttribute===i.GeometryOffsetAttribute.NONE?0:1,i.arrayFill(p,b),f.attributes.applyOffset=new o.GeometryAttribute({componentDatatype:r.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:p})),a.BoundingSphere.fromRectangle3D(n,l,E)):(f=function(e,t){var i=e._surfaceHeight,a=e._extrudedHeight,r=e._ellipsoid,n=a,o=i,l=v(e,t),s=(a=t.height,i=t.width,(e=c.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,o,r,!1)).length);(o=new Float64Array(2*s)).set(e),n=c.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,n,r),o.set(n,s),l.attributes.position.values=o,r=t.northCap,n=t.southCap,t=4,r&&--t,n&&--t,t=2*(o.length/3+t);for(var d=u.IndexDatatype.createTypedArray(o.length/3,t),p=(s=o.length/6,0),g=0;g<s-1;g++)d[p++]=g,d[p++]=g+1,d[p++]=g+s,d[p++]=g+s+1;return d[p++]=s-1,d[p++]=0,d[p++]=s+s-1,d[p++]=s,d[p++]=0,d[p++]=s,a=r?a-1:(d[p++]=r=i-1,d[p++]=r+s,i+a-2),d[p++]=a,d[p++]=a+s,n||(d[p++]=a=i+a-1,d[p]=a+s),l.indices=d,l}(t,p),e.defined(t._offsetAttribute)&&(g=f.attributes.position.values.length/3,h=new Uint8Array(g),h=t._offsetAttribute===i.GeometryOffsetAttribute.TOP?i.arrayFill(h,1,0,g/2):(b=t._offsetAttribute===i.GeometryOffsetAttribute.NONE?0:1,i.arrayFill(h,b)),f.attributes.applyOffset=new o.GeometryAttribute({componentDatatype:r.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:h})),h=a.BoundingSphere.fromRectangle3D(n,l,E,m),A=a.BoundingSphere.fromRectangle3D(n,l,A,y),a.BoundingSphere.union(h,A)),new o.Geometry({attributes:f.attributes,indices:f.indices,primitiveType:o.PrimitiveType.LINES,boundingSphere:E,offsetAttribute:t._offsetAttribute})}},function(i,a){return(i=e.defined(a)?E.unpack(i,a):i)._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),i._rectangle=t.Rectangle.clone(i._rectangle),E.createGeometry(i)}}));