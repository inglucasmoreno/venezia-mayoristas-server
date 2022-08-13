
import { Schema } from 'mongoose';

export const ventasMayoristasSchema = new Schema({
   
    mayorista: {
      type: Schema.Types.ObjectId,
      ref: 'mayoristas',
      required: true,
    },

    total_balanza: {
      type: Number,
      required: true,
    },

    total_no_balanza: {
      type: Number,
      required: true,
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
        required: true
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
