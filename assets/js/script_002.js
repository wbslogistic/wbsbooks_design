function checkJQueryMinVersion(need) {
    var v1 = need.split('.');
    var v1_num = 0;
    var v2 = jQuery.fn.jquery.split('.');
    var v2_num = 0;

    if(v1[0] != undefined) {
        v1_num += 100*100*parseInt(v1[0]);
    }
    if(v1[1] != undefined) {
        v1_num += 100*parseInt(v1[1]);
    }
    if(v1[2] != undefined) {
        v1_num += parseInt(v1[2]);
    }

    if(v2[0] != undefined) {
        v2_num += 100*100*parseInt(v2[0]);
    }
    if(v2[1] != undefined) {
        v2_num += 100*parseInt(v2[1]);
    }
    if(v2[2] != undefined) {
        v2_num += parseInt(v2[2]);
    }
    return (v1_num <= v2_num);
}
if(!window.jQuery || !checkJQueryMinVersion('1.9.1')){
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.fn.extend({
        data: function( key, value ) {
            var attrs, name,
                data = null,
                i = 0,
                elem = this[0];

            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves

            // Gets all values
            if ( key === undefined ) {
                if ( this.length ) {
                    data = jQuery.data( elem );

                    if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
                        attrs = elem.attributes;
                        for ( ; i < attrs.length; i++ ) {
                            name = attrs[i].name;

                            if ( name.indexOf("data-") === 0 ) {
                                name = jQuery.camelCase( name.slice(5) );

                                dataAttr( elem, name, data[ name ] );
                            }
                        }
                        jQuery._data( elem, "parsedAttrs", true );
                    }
                }

                return data;
            }

            // Sets multiple values
            if ( typeof key === "object" ) {
                return this.each(function() {
                    jQuery.data( this, key );
                });
            }

            return arguments.length > 1 ?

                // Sets one value
                this.each(function() {
                    jQuery.data( this, key, value );
                }) :

                // Gets one value
                // Try to fetch any internally stored data first
                elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
        },

        removeData: function( key ) {
            return this.each(function() {
                jQuery.removeData( this, key );
            });
        }
    });

    function dataAttr( elem, key, data ) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if ( data === undefined && elem.nodeType === 1 ) {

            var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

            data = elem.getAttribute( name );

            if ( typeof data === "string" ) {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                            data === "null" ? null :
                                // Only convert to a number if it doesn't change the string
                                +data + "" === data ? +data :
                                    rbrace.test( data ) ? jQuery.parseJSON( data ) :
                                        data;
                } catch( e ) {}

                // Make sure we set the data so it isn't changed later
                jQuery.data( elem, key, data );

            } else {
                data = undefined;
            }
        }

        return data;
    }
}