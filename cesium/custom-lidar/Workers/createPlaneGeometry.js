define(["./when-ad3237a0","./Transforms-1142ce48","./Cartesian2-08065eec","./Check-be2d5acb","./ComponentDatatype-a867ddaa","./GeometryAttribute-da891979","./GeometryAttributes-27dc652d","./VertexFormat-fc4fc84a","./Math-5ca9b250","./combine-1510933d","./RuntimeError-767bd866","./WebGLConstants-1c8239cc"],(function(e,t,r,a,n,o,m,i,u,c,p,y){"use strict";function s(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT),t=e.defaultValue(t.vertexFormat,i.VertexFormat.DEFAULT),this._vertexFormat=t,this._workerName="createPlaneGeometry"}s.packedLength=i.VertexFormat.packedLength,s.pack=function(t,r,a){return a=e.defaultValue(a,0),i.VertexFormat.pack(t._vertexFormat,r,a),r};var A=new i.VertexFormat,d={vertexFormat:A};s.unpack=function(t,r,a){return r=e.defaultValue(r,0),r=i.VertexFormat.unpack(t,r,A),e.defined(a)?(a._vertexFormat=i.VertexFormat.clone(r,a._vertexFormat),a):new s(d)};var l=new r.Cartesian3(-.5,-.5,0),F=new r.Cartesian3(.5,.5,0);return s.createGeometry=function(e){var a,i,u=e._vertexFormat,c=new m.GeometryAttributes;return u.position&&((e=new Float64Array(12))[0]=l.x,e[1]=l.y,e[2]=0,e[3]=F.x,e[4]=l.y,e[5]=0,e[6]=F.x,e[7]=F.y,e[8]=0,e[9]=l.x,e[10]=F.y,e[11]=0,c.position=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e}),u.normal&&((e=new Float32Array(12))[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=1,e[9]=0,e[10]=0,e[11]=1,c.normal=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})),u.st&&((a=new Float32Array(8))[0]=0,a[1]=0,a[2]=1,a[3]=0,a[4]=1,a[5]=1,a[6]=0,a[7]=1,c.st=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:a})),u.tangent&&((a=new Float32Array(12))[0]=1,a[1]=0,a[2]=0,a[3]=1,a[4]=0,a[5]=0,a[6]=1,a[7]=0,a[8]=0,a[9]=1,a[10]=0,a[11]=0,c.tangent=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:a})),u.bitangent&&((i=new Float32Array(12))[0]=0,i[1]=1,i[2]=0,i[3]=0,i[4]=1,i[5]=0,i[6]=0,i[7]=1,i[8]=0,i[9]=0,i[10]=1,i[11]=0,c.bitangent=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:i})),(i=new Uint16Array(6))[0]=0,i[1]=1,i[2]=2,i[3]=0,i[4]=2,i[5]=3),new o.Geometry({attributes:c,indices:i,primitiveType:o.PrimitiveType.TRIANGLES,boundingSphere:new t.BoundingSphere(r.Cartesian3.ZERO,Math.sqrt(2))})},function(t,r){return e.defined(r)&&(t=s.unpack(t,r)),s.createGeometry(t)}}));