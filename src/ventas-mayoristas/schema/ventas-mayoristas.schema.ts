
import { Schema } from 'mongoose';

export const ventasMayoristasSchema = new Schema({
   
    numero: {
      type: Number,
      required: true,
    },   

    mayorista: {
      type: Schema.Types.ObjectId,
      ref: 'mayoristas',
      required: true,
    },

    repartidor: {
      type: Schema.Types.ObjectId,
      ref: 'repartidores',
      required: true,
    },
    
    estado: {
      type: String,
      required: true,
    },   
    
    deuda: {
      type: Boolean,
      default: false
    }, 
    
    monto_recibido: {
      type: Number,
      default: 0
    }, 

    deuda_monto: {
      type: Number,
      default: 0
    },    

    precio_total: {
      type: Number,
      required: true,
    },

    facturacion: {
      puntoVenta: {
        type: Number,
        default: 0,
      },
      tipoComprobante: {
        type: Number,
        default: 0,
      },
      nroComprobante: {
        type: Number,
        default: 0,        
      }
    },

    comprobante: {
        type: String,
        default: 'Normal'
    },

    activo: {
        type: Boolean,
        required: true,
        default: true
    },

    creatorUser: {
      type: Schema.Types.ObjectId,
      ref: 'usuario',
      required: true
    },

    updatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },

},{ timestamps: true, collection: 'ventas_mayoristas' });
