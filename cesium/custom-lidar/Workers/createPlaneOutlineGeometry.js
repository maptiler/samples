define(["./when-ad3237a0","./Transforms-1142ce48","./Cartesian2-08065eec","./Check-be2d5acb","./ComponentDatatype-a867ddaa","./GeometryAttribute-da891979","./GeometryAttributes-27dc652d","./Math-5ca9b250","./combine-1510933d","./RuntimeError-767bd866","./WebGLConstants-1c8239cc"],(function(e,t,n,r,a,i,o,c,u,s,y){"use strict";function d(){this._workerName="createPlaneOutlineGeometry"}d.packedLength=0,d.pack=function(e,t){return t},d.unpack=function(t,n,r){return e.defined(r)?r:new d};var m=new n.Cartesian3(-.5,-.5,0),p=new n.Cartesian3(.5,.5,0);return d.createGeometry=function(){var e=new o.GeometryAttributes,r=new Uint16Array(8),c=new Float64Array(12);return c[0]=m.x,c[1]=m.y,c[2]=m.z,c[3]=p.x,c[4]=m.y,c[5]=m.z,c[6]=p.x,c[7]=p.y,c[8]=m.z,c[9]=m.x,c[10]=p.y,c[11]=m.z,e.position=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c}),r[0]=0,r[1]=1,r[2]=1,r[3]=2,r[4]=2,r[5]=3,r[6]=3,r[7]=0,new i.Geometry({attributes:e,indices:r,primitiveType:i.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=d.unpack(t,n)),d.createGeometry(t)}}));